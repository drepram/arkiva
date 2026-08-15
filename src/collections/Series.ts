import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";
import { slugField } from "@/fields/slug";
import { editors, publishedOrAuthenticated } from "./access";

const revalidate = (...paths: string[]) => {
  try {
    paths.forEach((path) => revalidatePath(path));
  } catch {
    // Seeds and migrations run outside Next's request lifecycle.
  }
};

export const Series: CollectionConfig = {
  slug: "series",
  admin: { useAsTitle: "title" },
  access: { create: editors, read: publishedOrAuthenticated, update: editors, delete: editors },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "summary", type: "textarea" },
    { name: "description", type: "richText" },
    { name: "coverImage", type: "upload", relationTo: "images" },
    { name: "sourceUrl", type: "text", admin: { position: "sidebar" } },
  ],
  hooks: {
    afterChange: [({ doc, previousDoc }) => {
      revalidate("/series", `/series/${doc.slug}`);
      if (previousDoc?.slug && previousDoc.slug !== doc.slug) revalidate(`/series/${previousDoc.slug}`);
    }],
    afterDelete: [({ doc }) => revalidate("/series", `/series/${doc.slug}`)],
  },
};
