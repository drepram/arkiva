import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";
import { slugField } from "@/fields/slug";
import { reservedRootSlugs } from "@/lib/slug";
import { editors, publishedOrAuthenticated } from "./access";

const revalidate = (...paths: string[]) => {
  try {
    paths.forEach((path) => revalidatePath(path));
  } catch {
    // Seeds and migrations run outside Next's request lifecycle.
  }
};

export const Artefacts: CollectionConfig = {
  slug: "artefacts",
  labels: { singular: "Artefact", plural: "Artefacts" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "displayDate", "type", "updatedAt"] },
  access: { create: editors, read: publishedOrAuthenticated, update: editors, delete: editors },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      type: "row",
      fields: [
        { name: "displayDate", type: "text", required: true, admin: { width: "50%", description: "For example: c. 1946-1949" } },
        { name: "decade", type: "number", index: true, admin: { width: "50%", readOnly: true, description: "Derived from start year" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "yearStart", type: "number", min: 1000, max: 2100, admin: { width: "50%" } },
        { name: "yearEnd", type: "number", min: 1000, max: 2100, admin: { width: "50%" } },
      ],
    },
    { name: "type", type: "relationship", relationTo: "artefact-types", required: true, index: true },
    { name: "creators", type: "relationship", relationTo: "creators", hasMany: true },
    { name: "creatorRole", type: "text", admin: { description: "For example: Design, Artist, or Creator" } },
    { name: "series", type: "relationship", relationTo: "series", hasMany: true },
    { name: "source", type: "relationship", relationTo: "sources" },
    { name: "holdingCollection", type: "text", label: "Collection / Holding Institution" },
    { name: "objectDetail", type: "textarea", label: "Object Detail" },
    { name: "summary", type: "textarea" },
    { name: "description", type: "richText" },
    {
      name: "images",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        { name: "image", type: "upload", relationTo: "images", required: true },
        { name: "caption", type: "textarea" },
      ],
    },
    { name: "tags", type: "text", hasMany: true },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    {
      name: "legacy",
      type: "group",
      admin: { position: "sidebar" },
      fields: [
        { name: "id", type: "text", unique: true, index: true },
        { name: "url", type: "text", admin: { description: "Original public URL before migration" } },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (data.slug && reservedRootSlugs.has(data.slug)) throw new Error(`The root slug '${data.slug}' is reserved.`);
        data.decade = data.yearStart ? Math.floor(Number(data.yearStart) / 10) * 10 : null;
        return data;
      },
    ],
    afterChange: [({ doc, previousDoc }) => {
      revalidate("/", doc.slug ? `/${doc.slug}` : "");
      if (previousDoc?.slug && previousDoc.slug !== doc.slug) revalidate(`/${previousDoc.slug}`);
    }],
    afterDelete: [({ doc }) => revalidate("/", doc.slug ? `/${doc.slug}` : "")],
  },
};
