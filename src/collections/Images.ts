import type { CollectionConfig } from "payload";
import { anyone, editors } from "./access";

export const Images: CollectionConfig = {
  slug: "images",
  access: { create: editors, read: anyone, update: editors, delete: editors },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    adminThumbnail: "card",
    imageSizes: [
      { name: "card", width: 640, height: 800, fit: "inside", formatOptions: { format: "webp", options: { quality: 72 } } },
      { name: "detail", width: 1800, height: 2200, fit: "inside", formatOptions: { format: "webp", options: { quality: 82 } } },
    ],
  },
  fields: [
    { name: "prefix", type: "text", defaultValue: "arkiva", admin: { hidden: true } },
    { name: "alt", type: "text", required: true },
    { name: "caption", type: "textarea" },
    { name: "credit", type: "text" },
    { name: "sourceUrl", type: "text" },
  ],
};
