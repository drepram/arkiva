import "dotenv/config";
import fs from "node:fs";
import { parse } from "csv-parse/sync";
import { getPayload } from "payload";
import config from "@payload-config";
import { env } from "@/lib/env";
import { formatSlug } from "@/lib/slug";

type Row = {
  id?: string;
  title: string;
  slug?: string;
  displayDate?: string;
  yearStart?: string;
  yearEnd?: string;
  type?: string;
  creators?: string;
  series?: string;
  source?: string;
  summary?: string;
  imageUrl?: string;
  originalUrl?: string;
};

const split = (value = "") => value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);

async function upsertTaxonomy(payload: Awaited<ReturnType<typeof getPayload>>, collection: "creators" | "artefact-types" | "sources", name: string) {
  const slug = formatSlug(name);
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 });
  if (existing.docs[0]) return existing.docs[0].id;
  return (await payload.create({ collection, data: { name, slug } })).id;
}

async function run() {
  if (!env.artefactsCsv) throw new Error("Set ARTEFACTS_CSV to the exported CSV path.");
  const payload = await getPayload({ config });
  const rows = parse(fs.readFileSync(env.artefactsCsv, "utf8"), { columns: true, skip_empty_lines: true, bom: true }) as Row[];

  for (const row of rows) {
    if (!row.title) continue;
    const slug = formatSlug(row.slug || row.title);
    const typeId = await upsertTaxonomy(payload, "artefact-types", row.type || "Uncategorized");
    const creatorIds = await Promise.all(split(row.creators).map((name) => upsertTaxonomy(payload, "creators", name)));
    const sourceId = row.source ? await upsertTaxonomy(payload, "sources", row.source) : undefined;
    const existing = await payload.find({ collection: "artefacts", where: { or: [{ slug: { equals: slug } }, { "legacy.id": { equals: row.id || "__none__" } }] }, limit: 1 });

    const data = {
      title: row.title,
      slug,
      displayDate: row.displayDate || row.yearStart || "Date unknown",
      yearStart: row.yearStart ? Number(row.yearStart) : undefined,
      yearEnd: row.yearEnd ? Number(row.yearEnd) : undefined,
      type: typeId,
      creators: creatorIds,
      source: sourceId,
      summary: row.summary,
      legacy: { id: row.id, url: row.originalUrl },
      _status: "draft" as const,
    };

    if (existing.docs[0]) await payload.update({ collection: "artefacts", id: existing.docs[0].id, data });
    else {
      // Images are deliberately migrated separately so no record silently depends on a vendor URL.
      console.warn(`Skipping new '${row.title}' until its image has been downloaded and uploaded.`);
    }
  }
}

run().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1); });
