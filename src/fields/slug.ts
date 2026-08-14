import type { Field } from "payload";
import { formatSlug } from "@/lib/slug";

export const slugField = (trackingField: string): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar" },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => value
        ? String(value).trim().replace(/^\/+|\/+$/g, "")
        : formatSlug(String(siblingData?.[trackingField] || "")),
    ],
  },
});
