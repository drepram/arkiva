import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@/components/RichText";
import { resolveImage } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 300;

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const result = await payload.find({ collection: "articles", pagination: false, depth: 0, select: { slug: true } });
  return result.docs.map(({ slug }) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const result = await payload.find({ collection: "articles", where: { slug: { equals: slug } }, limit: 1 });
  const article = result.docs[0];
  if (!article) notFound();
  const cover = resolveImage(article.coverImage, "detail");
  return <main className="article-page"><header><p className="eyebrow">Article</p><h1>{article.title}</h1><div className="article-byline"><span>{article.author || "Artefak Kita"}</span>{article.publishedAt ? <time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(article.publishedAt))}</time> : null}</div></header>{cover?.url ? <figure className="article-cover"><img src={cover.url} alt={article.title} width={cover.width || 1800} height={cover.height || 1200} /></figure> : null}<article className="article-body prose">{article.bodyMarkdown ? <ReactMarkdown>{article.bodyMarkdown}</ReactMarkdown> : article.body ? <RichText data={article.body as SerializedEditorState} /> : null}</article></main>;
}
