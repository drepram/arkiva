import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

export const getPayloadClient = () => getPayload({ config });

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
