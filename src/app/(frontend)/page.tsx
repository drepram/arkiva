import Link from "next/link";
import type { Where } from "payload";
import { getArchiveFacets, getPayloadClient } from "@/lib/payload";
import { resolveImage } from "@/lib/media";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (value: string | string[] | undefined) => typeof value === "string" ? value : "";
const relationName = (value: unknown) => value && typeof value === "object" && "name" in value
  ? String((value as { name?: string }).name || "")
  : "";
const relationNames = (value: unknown) => Array.isArray(value)
  ? value.map(relationName).filter(Boolean).join(", ")
  : "";

export const dynamic = "force-dynamic";

export default async function ArchivePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = one(params.q).trim();
  const type = one(params.type);
  const creator = one(params.creator);
  const series = one(params.series);
  const decade = one(params.decade);
  const sort = one(params.sort) || "relevant";
  const currentPage = Math.max(1, Number.parseInt(one(params.page), 10) || 1);
  const hasFilters = Boolean(q || type || creator || series || decade || sort !== "relevant");
  const sortValue = {
    relevant: ["sortOrder", "-createdAt"],
    newest: ["-createdAt"],
    earliest: ["yearStart", "title"],
    latest: ["-yearStart", "title"],
    title: ["title"],
  }[sort] || ["sortOrder", "-createdAt"];
  const and: Where[] = [];

  if (q) and.push({ or: [
    { title: { contains: q } },
    { summary: { contains: q } },
    { displayDate: { contains: q } },
    { tags: { contains: q } },
  ] });
  if (type) and.push({ "type.slug": { equals: type } });
  if (creator) and.push({ "creators.slug": { equals: creator } });
  if (series) and.push({ "series.slug": { equals: series } });
  if (decade) and.push({ decade: { equals: Number(decade) } });

  const payload = await getPayloadClient();
  const [artefacts, facets] = await Promise.all([
    payload.find({
      collection: "artefacts",
      where: and.length ? { and } : undefined,
      depth: 1,
      limit: 48,
      page: currentPage,
      sort: sortValue,
      select: { title: true, slug: true, displayDate: true, type: true, creators: true, images: true },
    }),
    getArchiveFacets(),
  ]);
  const resultCount = new Intl.NumberFormat("en").format(artefacts.totalDocs);
  const pageHref = (page: number) => {
    const query = new URLSearchParams();
    Object.entries({ q, type, creator, series, decade, sort: sort === "relevant" ? "" : sort }).forEach(([key, value]) => { if (value) query.set(key, value); });
    if (page > 1) query.set("page", String(page));
    const value = query.toString();
    return value ? `/?${value}` : "/";
  };

  return (
    <main>
      <section className="archive-intro">
        <div>
          <h1>Artefak Kita</h1>
        </div>
        <p>A curated digital archive exploring vintage Indonesian art, design & its political narratives.</p>
        <dl>
          <div><dt>Collection</dt><dd>{resultCount} records</dd></div>
          <div><dt>Coverage</dt><dd>1600s–2000s</dd></div>
          <div><dt>Access</dt><dd>Open online</dd></div>
        </dl>
      </section>

      <form className="filters" action="/">
        <label><span>Sort</span><select name="sort" defaultValue={sort}><option value="relevant">Most Relevant</option><option value="newest">Recently Added</option><option value="earliest">Earliest Date</option><option value="latest">Latest Date</option><option value="title">Title A–Z</option></select></label>
        <label className="search-field">
          <span>Search the archive</span>
          <input type="search" name="q" defaultValue={q} placeholder="Title, year, subject…" autoComplete="off" />
        </label>
        <label><span>Decade</span><select name="decade" defaultValue={decade}><option value="">All decades</option>{facets.decades.map((value) => <option key={value} value={String(value)}>{value}s</option>)}</select></label>
        <label><span>Type</span><select name="type" defaultValue={type}><option value="">All types</option>{facets.types.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label>
        <label><span>Creator</span><select name="creator" defaultValue={creator}><option value="">All creators</option>{facets.creators.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label>
        <label><span>Series</span><select name="series" defaultValue={series}><option value="">All series</option>{facets.series.map((item) => <option key={item.id} value={item.slug}>{item.title}</option>)}</select></label>
        <button type="submit">Search Archive</button>
      </form>

      {hasFilters ? <div className="active-filters"><span aria-live="polite">{resultCount} result{artefacts.totalDocs === 1 ? "" : "s"}</span><Link href="/">Clear Filters</Link></div> : null}

      {artefacts.docs.length ? (
        <div className="archive-grid">
          {artefacts.docs.map((artefact, index) => {
            const firstImage = artefact.images?.[0]?.image;
            const image = resolveImage(firstImage, "card");
            return (
              <article className={`artefact-card card-${index % 5}`} key={artefact.id}>
                <Link href={`/${artefact.slug}`}>
                  <div className="image-frame">
                    <span className="card-number" aria-hidden="true">{String((currentPage - 1) * 48 + index + 1).padStart(3, "0")}</span>
                    {image?.url ? <img src={image.url} alt={artefact.title} width={image.width || 640} height={image.height || 800} loading="lazy" decoding="async" /> : <span className="image-missing">Image Pending</span>}
                  </div>
                  <div className="card-meta">
                    <p><span>{relationName(artefact.type)}</span><span>{artefact.displayDate}</span></p>
                    <h3>{artefact.title}</h3>
                    <small>{relationNames(artefact.creators) || "Creator Unknown"}</small>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : <div className="empty-state"><p>No artefacts match these filters.</p>{hasFilters ? <Link href="/">View the Full Collection</Link> : <span>The collection is ready for its first record.</span>}</div>}
      {artefacts.totalPages > 1 ? <nav className="pagination" aria-label="Collection pages"><span>Page {artefacts.page} of {artefacts.totalPages}</span><div>{artefacts.hasPrevPage ? <Link href={pageHref(currentPage - 1)}>← Previous</Link> : <span />}{artefacts.hasNextPage ? <Link href={pageHref(currentPage + 1)}>Next →</Link> : null}</div></nav> : null}
    </main>
  );
}
