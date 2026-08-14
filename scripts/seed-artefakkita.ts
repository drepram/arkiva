import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";
import { env } from "@/lib/env";
import { formatSlug } from "@/lib/slug";

type SitePage = {
  type: "home" | "articles-index" | "series-index" | "series" | "about" | "contribute" | "article" | "artefact";
  url: string;
  title: string;
  description: string;
  images: string[];
  content: string;
};

type SiteContent = { pages: SitePage[] };
type ImageAsset = { filename: string; source: string; base: string; pages: string[] };
type ImageManifest = { assets: ImageAsset[] };
type RichTextValue = {
  root: {
    type: "root";
    version: 1;
    children: Array<{ type: "paragraph"; version: 1; children: Array<{ type: "text"; version: 1; text: string }> }>;
    direction: "ltr";
    format: "";
    indent: 0;
  };
};

const metadataLabels = new Set(["Year", "Design", "Creator", "Artist", "Object Detail", "Type", "Collection", "Source", "See all"]);
const clean = (value?: string) => {
  const result = value?.trim();
  return !result || result === "N/A" ? undefined : result;
};
const richText = (text: string): RichTextValue => ({ root: { type: "root", version: 1, children: [{ type: "paragraph", version: 1, children: [{ type: "text", version: 1, text }] }], direction: "ltr", format: "", indent: 0 } });
const linesOf = (content: string) => content.split("\n").map((line) => line.trim());
const valueAfter = (content: string, label: string) => {
  const lines = linesOf(content);
  const index = lines.indexOf(label);
  for (let cursor = index + 1; index >= 0 && cursor < lines.length; cursor += 1) {
    if (!lines[cursor]) continue;
    return metadataLabels.has(lines[cursor]) || /^#{1,3}\s/.test(lines[cursor]) ? undefined : clean(lines[cursor]);
  }
  return undefined;
};
const baseUrl = (url: string) => url.split("?")[0];
const parseYears = (displayDate: string) => {
  const years = displayDate.match(/(?:1[0-9]{3}|20[0-9]{2})/g)?.map(Number) || [];
  return { yearStart: years[0], yearEnd: years.length > 1 ? years.at(-1) : undefined };
};
const normalizeSourceUrl = (value?: string) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return !value.includes(" ") && value.includes(".") ? `https://${value}` : undefined;
};
const articleParts = (content: string) => {
  const lines = content.split("\n");
  const dateIndex = lines.findIndex((line) => /^[A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(line.trim()));
  const author = dateIndex > 0 ? [...lines.slice(0, dateIndex)].reverse().find((line) => line.trim())?.trim() : undefined;
  const endIndex = lines.findIndex((line, index) => index > dateIndex && line.trim() === "## Other articles");
  const body = dateIndex >= 0 ? lines.slice(dateIndex + 1, endIndex > dateIndex ? endIndex : undefined).join("\n").trim() : content;
  return { author, publishedAt: dateIndex >= 0 ? new Date(lines[dateIndex].trim()).toISOString() : undefined, body };
};

async function run() {
  const contentPath = path.join(env.artefakKitaSiteDir, "site-content.json");
  const imageManifestPath = path.join(env.artefakKitaSiteDir, "images", "manifest.json");
  if (!fs.existsSync(contentPath) || !fs.existsSync(imageManifestPath)) throw new Error(`Incomplete Artefak Kita export: ${env.artefakKitaSiteDir}`);

  const site = JSON.parse(fs.readFileSync(contentPath, "utf8")) as SiteContent;
  const imageManifest = JSON.parse(fs.readFileSync(imageManifestPath, "utf8")) as ImageManifest;
  const payload = await getPayload({ config });
  const imageByBase = new Map<string, number>();
  const imageByFilename = new Map<string, number>();
  const taxonomyCache = new Map<string, number>();

  for (const [index, asset] of imageManifest.assets.entries()) {
    const existing = await payload.find({ collection: "images", where: { filename: { equals: asset.filename } }, limit: 1 });
    let image = existing.docs[0];
    if (!image) {
      const filePath = path.join(env.artefakKitaSiteDir, "images", asset.filename);
      const data = fs.readFileSync(filePath);
      image = await payload.create({ collection: "images", data: { alt: asset.filename.replace(/^\d+-|^site-|\.[^.]+$/g, "").replace(/-/g, " "), sourceUrl: asset.source, credit: "Artefak Kita" }, file: { data, name: asset.filename, mimetype: asset.filename.endsWith(".png") ? "image/png" : "image/webp", size: data.length } });
    }
    imageByBase.set(asset.base, image.id);
    imageByFilename.set(asset.filename, image.id);
    if ((index + 1) % 25 === 0 || index === imageManifest.assets.length - 1) console.log(`Prepared ${index + 1}/${imageManifest.assets.length} media assets`);
  }

  const upsertTaxonomy = async (collection: "creators" | "artefact-types" | "sources", name: string, url?: string) => {
    const key = `${collection}:${name}`;
    const cached = taxonomyCache.get(key);
    if (cached) return cached;
    const slug = formatSlug(name);
    const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 });
    const document = existing.docs[0]
      ? url && collection === "sources" ? await payload.update({ collection, id: existing.docs[0].id, data: { name, slug, url } }) : existing.docs[0]
      : await payload.create({ collection, data: { name, slug, ...(collection === "sources" ? { url } : {}) } });
    taxonomyCache.set(key, document.id);
    return document.id;
  };

  const artefacts = site.pages.filter((page) => page.type === "artefact");
  for (const [index, page] of artefacts.entries()) {
    const slug = decodeURIComponent(new URL(page.url).pathname.replace(/^\//, ""));
    const headings = linesOf(page.content).filter((line) => line.startsWith("# ")).map((line) => line.slice(2));
    const title = headings[1] || headings[0].replace(/ – Historical Visual Artefact \| Artefak Kita$/, "");
    const displayDate = valueAfter(page.content, "Year") || "Date unknown";
    const { yearStart, yearEnd } = parseYears(displayDate);
    const typeName = valueAfter(page.content, "Type") || "Uncategorized";
    const creatorRole = ["Design", "Creator", "Artist"].find((label) => valueAfter(page.content, label));
    const creatorCredit = creatorRole ? valueAfter(page.content, creatorRole) : undefined;
    const creatorNames = creatorCredit?.split(",").map((name) => clean(name)).filter((name): name is string => Boolean(name)) || [];
    const sourceRaw = valueAfter(page.content, "Source");
    const sourceUrl = normalizeSourceUrl(sourceRaw);
    const typeId = await upsertTaxonomy("artefact-types", typeName);
    const creatorIds = await Promise.all(creatorNames.map((name) => upsertTaxonomy("creators", name)));
    const sourceId = await upsertTaxonomy("sources", sourceRaw || "Artefak Kita", sourceUrl);
    const filename = `${String(index + 1).padStart(3, "0")}-`;
    const primaryEntry = [...imageByFilename.entries()].find(([name]) => name.startsWith(filename));
    const imageId = primaryEntry?.[1] || imageByBase.get(baseUrl(page.images[0] || ""));
    if (!imageId) throw new Error(`No local image for ${page.url}`);

    const data = { title, slug, displayDate, yearStart, yearEnd, type: typeId, creators: creatorIds, creatorRole, source: sourceId, holdingCollection: valueAfter(page.content, "Collection"), objectDetail: valueAfter(page.content, "Object Detail"), summary: clean(page.description), description: page.description ? richText(page.description) : undefined, images: [{ image: imageId }], legacy: { id: String(index + 1).padStart(3, "0"), url: page.url }, _status: "published" as const };
    const existing = await payload.find({ collection: "artefacts", where: { slug: { equals: slug } }, limit: 1 });
    if (existing.docs[0]) await payload.update({ collection: "artefacts", id: existing.docs[0].id, data });
    else await payload.create({ collection: "artefacts", data });
    if ((index + 1) % 25 === 0 || index === artefacts.length - 1) console.log(`Seeded ${index + 1}/${artefacts.length} artefacts`);
  }

  const seriesPages = site.pages.filter((page) => page.type === "series");
  for (const page of seriesPages) {
    const slug = new URL(page.url).pathname.split("/").filter(Boolean).at(-1) || formatSlug(page.title);
    const title = linesOf(page.content).find((line) => line.startsWith("# "))?.slice(2).split(" – ")[0] || page.title.split(" – ")[0];
    const coverImage = imageByBase.get(baseUrl(page.images[0] || ""));
    const data = { title, slug, summary: page.description, description: richText(page.description), coverImage, sourceUrl: page.url, _status: "published" as const };
    const existing = await payload.find({ collection: "series", where: { slug: { equals: slug } }, limit: 1 });
    if (existing.docs[0]) await payload.update({ collection: "series", id: existing.docs[0].id, data });
    else await payload.create({ collection: "series", data });
  }

  const articlePages = site.pages.filter((page) => page.type === "article");
  for (const page of articlePages) {
    const slug = new URL(page.url).pathname.split("/").filter(Boolean).at(-1) || formatSlug(page.title);
    const title = linesOf(page.content).filter((line) => line.startsWith("# "))[1]?.slice(2) || page.title;
    const { author, publishedAt, body } = articleParts(page.content);
    const coverImage = imageByBase.get(baseUrl(page.images[0] || ""));
    const data = { title, slug, excerpt: page.description, author, bodyMarkdown: body, coverImage, sourceUrl: page.url, publishedAt, _status: "published" as const };
    const existing = await payload.find({ collection: "articles", where: { slug: { equals: slug } }, limit: 1 });
    if (existing.docs[0]) await payload.update({ collection: "articles", id: existing.docs[0].id, data });
    else await payload.create({ collection: "articles", data });
  }

  console.log(`Seeded ${imageManifest.assets.length} images, ${artefacts.length} artefacts, ${seriesPages.length} series, and ${articlePages.length} articles.`);
}

run().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1); });
