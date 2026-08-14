import type { CollectionConfig, Field } from "payload";
import { slugField } from "@/fields/slug";
import { anyone, editors } from "./access";

const taxonomy = (slug: string, singular: string, plural: string, fields: Field[] = []): CollectionConfig => ({
  slug,
  labels: { singular, plural },
  admin: { useAsTitle: "name" },
  access: { create: editors, read: anyone, update: editors, delete: editors },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "description", type: "textarea" },
    ...fields,
  ],
});

export const Creators = taxonomy("creators", "Creator", "Creators");
export const ArtefactTypes = taxonomy("artefact-types", "Artefact Type", "Artefact Types");
export const Sources = taxonomy("sources", "Source", "Sources", [
  { name: "url", type: "text" },
]);
