import { notFound } from "next/navigation";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@/components/RichText";
import { resolveImage } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

export default async function SeriesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const result = await payload.find({ collection: "series", where: { slug: { equals: slug } }, limit: 1 });
  const item = result.docs[0];
  if (!item) notFound();
  const cover = resolveImage(item.coverImage, "detail");
  return <main className="series-page"><header><p className="eyebrow">Series</p><h1>{item.title}</h1><p>{item.summary}</p></header>{cover?.url ? <figure><img src={cover.url} alt={item.title} width={cover.width || 1800} height={cover.height || 1200} /></figure> : null}{item.description ? <div className="prose"><RichText data={item.description as SerializedEditorState} /></div> : null}</main>;
}
