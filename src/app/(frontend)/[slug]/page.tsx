import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveImage } from "@/lib/media";
import { getArtefactBySlug, getPayloadClient } from "@/lib/payload";

type Params = Promise<{ slug: string }>;

const nameOf = (value: unknown, field = "name") => value && typeof value === "object" && field in value
  ? String((value as Record<string, unknown>)[field] || "")
  : "";

export const revalidate = 300;

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const result = await payload.find({ collection: "artefacts", pagination: false, depth: 0, select: { slug: true } });
  return result.docs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug: encodedSlug } = await params;
  const slug = decodeURIComponent(encodedSlug);
  const artefact = await getArtefactBySlug(slug);
  if (!artefact) return { title: "Artefact not found" };
  return { title: artefact.title, description: artefact.summary || `${artefact.title}, ${artefact.displayDate}` };
}

export default async function ArtefactPage({ params }: { params: Params }) {
  const { slug: encodedSlug } = await params;
  const slug = decodeURIComponent(encodedSlug);
  const artefact = await getArtefactBySlug(slug);
  if (!artefact) notFound();
  const creators = (artefact.creators || []).map((item) => nameOf(item)).filter(Boolean);
  const source = nameOf(artefact.source);
  const sourceUrl = artefact.source && typeof artefact.source === "object" ? artefact.source.url : undefined;
  const type = nameOf(artefact.type);

  return (
    <main className="detail-page">
      <a className="back-link" href="/">← Collection Index</a>
      <div className="detail-layout">
        <div className="gallery">
          {artefact.images?.map((entry, index) => {
            const image = resolveImage(entry.image, "detail");
            if (!image?.url) return null;
            return <figure key={entry.id || index}><img src={image.url} alt={artefact.title} width={image.width || 1800} height={image.height || 2200} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" />{entry.caption ? <figcaption>{entry.caption}</figcaption> : null}</figure>;
          })}
        </div>
        <aside className="object-record">
          <p className="eyebrow">{type || "Artefact"} · {artefact.displayDate}</p>
          <h1>{artefact.title}</h1>
          {artefact.summary ? <p className="detail-summary">{artefact.summary}</p> : null}
          <h2>Object Record</h2>
          <dl>
            <div><dt>Date</dt><dd>{artefact.displayDate}</dd></div>
            <div><dt>Type</dt><dd>{type || "Unknown"}</dd></div>
            <div><dt>{artefact.creatorRole || "Creator"}</dt><dd>{creators.join(", ") || "Unknown"}</dd></div>
            {artefact.objectDetail ? <div><dt>Object Detail</dt><dd>{artefact.objectDetail}</dd></div> : null}
            {artefact.holdingCollection ? <div><dt>Collection</dt><dd>{artefact.holdingCollection}</dd></div> : null}
            <div><dt>Source</dt><dd>{sourceUrl ? <a href={sourceUrl}>{source || sourceUrl}</a> : source || "Not recorded"}</dd></div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
