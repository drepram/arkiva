export const formatSlug = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const reservedRootSlugs = new Set([
  "admin",
  "api",
  "articles",
  "about",
  "contribute",
  "finds",
  "series",
]);
