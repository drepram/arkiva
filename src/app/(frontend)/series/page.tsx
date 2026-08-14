import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

export default async function SeriesPage() {
  const payload = await getPayloadClient();
  const result = await payload.find({ collection: "series", pagination: false, sort: "title" });
  return <main className="index-page"><p className="eyebrow">Collections in context</p><h1>Series</h1><div className="index-list">{result.docs.map((item, index) => <Link href={`/series/${item.slug}`} key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.summary}</small></Link>)}</div></main>;
}
