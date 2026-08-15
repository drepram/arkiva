type PayloadImage = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: Record<string, {
    url?: string | null;
    width?: number | null;
    height?: number | null;
  } | undefined> | null;
};

export const resolveImage = (value: unknown, size?: string): PayloadImage | null => {
  if (!value || typeof value !== "object") return null;
  const image = value as PayloadImage;
  const candidate = size ? image.sizes?.[size] : undefined;
  const sizedUrl = candidate?.url && !candidate.url.split("?")[0].endsWith("/null")
    ? candidate.url
    : undefined;
  return {
    ...image,
    url: sizedUrl || image.url,
    width: sizedUrl ? candidate?.width || image.width : image.width,
    height: sizedUrl ? candidate?.height || image.height : image.height,
  };
};
