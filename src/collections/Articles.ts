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

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: { useAsTitle: "title" },
  access: { create: editors, read: publishedOrAuthenticated, update: editors, delete: editors },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "excerpt", type: "textarea" },
    { name: "author", type: "text" },
    { name: "body", type: "richText" },
    { name: "bodyMarkdown", type: "textarea", label: "Body (Markdown)" },
    { name: "coverImage", type: "upload", relationTo: "images" },
    { name: "sourceUrl", type: "text", admin: { position: "sidebar" } },
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
  ],
  hooks: {
    afterChange: [({ doc }) => revalidate("/articles", `/articles/${doc.slug}`)],
  },
};
