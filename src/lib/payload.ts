import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

export const getPayloadClient = () => getPayload({ config });

export const getArchiveFacets = () =>
  unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const [types, creators, series, decadeRecords] = await Promise.all([
        payload.find({ collection: "artefact-types", pagination: false, depth: 0, sort: "name", select: { name: true, slug: true } }),
        payload.find({ collection: "creators", pagination: false, depth: 0, sort: "name", select: { name: true, slug: true } }),
        payload.find({ collection: "series", pagination: false, depth: 0, sort: "title", select: { title: true, slug: true } }),
        payload.find({ collection: "artefacts", pagination: false, depth: 0, select: { decade: true } }),
      ]);

      return {
        types: types.docs,
        creators: creators.docs,
        series: series.docs,
        decades: [...new Set(decadeRecords.docs.map((item) => item.decade).filter(Boolean))].sort((a, b) => Number(b) - Number(a)),
      };
    },
    ["archive-facets"],
    { revalidate: 300, tags: ["archive-facets"] },
  )();

export const getArtefactBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "artefacts",
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
      });
      return result.docs[0] || null;
    },
    ["artefact", slug],
    { revalidate: 300 },
  )();
