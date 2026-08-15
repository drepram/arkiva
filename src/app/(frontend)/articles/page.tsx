import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 300;

export default async function ArticlesPage() {
  const payload = await getPayloadClient();
  const result = await payload.find({ collection: "articles", pagination: false, depth: 0, sort: "-publishedAt", select: { title: true, slug: true, excerpt: true } });
  return <main className="index-page"><p className="eyebrow">Writing and research</p><h1>Articles</h1><div className="index-list">{result.docs.map((item, index) => <Link href={`/articles/${item.slug}`} key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.excerpt}</small></Link>)}</div></main>;
}
