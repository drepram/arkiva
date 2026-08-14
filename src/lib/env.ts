const appEnv = process.env.APP_ENV === "server" ? "server" : "local";
const prefix = appEnv === "server" ? "SERVER" : "LOCAL";

const getEnv = (name: string, fallback = "") =>
  process.env[name] || process.env[`${prefix}_${name}`] || fallback;

const required = (name: string, fallback?: string) => {
  const value = getEnv(name, fallback);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const getBool = (name: string, fallback: boolean) => {
  const value = getEnv(name);
  if (!value) return fallback;
  return value === "true" || value === "1";
};

const getDatabaseUrl = () => {
  const directUrl = process.env.DATABASE_URL;
  if (directUrl) return directUrl;

  const scopedUrl = process.env[`${prefix}_DATABASE_URL`];
  if (!scopedUrl) return "postgres://postgres:postgres@127.0.0.1:5432/arkiva";

  // Reuse copied environment credentials without writing Arkiva tables into Kabe's database.
  const url = new URL(scopedUrl);
  url.pathname = `/${process.env.ARKIVA_DATABASE_NAME || "arkiva"}`;
  return url.toString();
};

export const env = {
  appEnv,
  databaseUrl: getDatabaseUrl(),
  payloadSecret: required("PAYLOAD_SECRET", "local-development-secret-change-me"),
  siteUrl: getEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  disableR2: getBool("DISABLE_R2", getBool("DO_NOT_USE_BUCKET", true)),
  cloudflareAccountId: getEnv("CLOUDFLARE_ACCOUNT_ID"),
  bucket: getEnv("R2_BUCKET") || getEnv("IMAGE_BUCKET"),
  accessKeyId: getEnv("R2_ACCESS_KEY_ID") || getEnv("IMAGE_BUCKET_ACCESS_KEY_ID"),
  secretAccessKey: getEnv("R2_SECRET_ACCESS_KEY") || getEnv("IMAGE_BUCKET_SECRET_ACCESS_KEY"),
  mediaPublicUrl: (getEnv("MEDIA_PUBLIC_URL") || getEnv("IMAGE_CDN_URL")).replace(/\/$/, ""),
  mediaPrefix: getEnv("R2_PREFIX", "arkiva").replace(/^\/+|\/+$/g, ""),
  artefactsCsv: getEnv("ARTEFACTS_CSV"),
  artefakKitaSiteDir: getEnv(
    "ARTEFAKKITA_SITE_DIR",
    "/Users/drepram/Personal/Experiments/artefakkita-site",
  ),
};
