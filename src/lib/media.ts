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
  const sizedUrl = size ? image.sizes?.[size]?.url : undefined;
  return { ...image, url: sizedUrl || image.url };
};
