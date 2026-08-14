type PayloadImage = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: Record<string, { url?: string | null } | undefined> | null;
};

export const resolveImage = (value: unknown, size?: string): PayloadImage | null => {
  if (!value || typeof value !== "object") return null;
  const image = value as PayloadImage;
  const candidate = size ? image.sizes?.[size]?.url : undefined;
  const sizedUrl = candidate && !candidate.split("?")[0].endsWith("/null")
    ? candidate
    : undefined;
  return { ...image, url: sizedUrl || image.url };
};
