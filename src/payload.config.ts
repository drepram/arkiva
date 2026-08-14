import path from "node:path";
import sharp from "sharp";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import { fileURLToPath } from "node:url";
import { Articles } from "@/collections/Articles";
import { Artefacts } from "@/collections/Artefacts";
import { Images } from "@/collections/Images";
import { Series } from "@/collections/Series";
import { ArtefactTypes, Creators, Sources } from "@/collections/taxonomy";
import { Users } from "@/collections/Users";
import { env } from "@/lib/env";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const plugins = env.disableR2 ? [] : [
  s3Storage({
    collections: {
      images: {
        prefix: env.mediaPrefix,
        generateFileURL: ({ filename, prefix }) => {
          if (!filename) return "";
          const objectPrefix = prefix || env.mediaPrefix;
          return `${env.mediaPublicUrl}/${objectPrefix}/${encodeURIComponent(filename)}`;
        },
      },
    },
    bucket: env.bucket,
    config: {
      credentials: { accessKeyId: env.accessKeyId, secretAccessKey: env.secretAccessKey },
      region: "auto",
      endpoint: `https://${env.cloudflareAccountId}.r2.cloudflarestorage.com`,
    },
  }),
];

export default buildConfig({
  editor: lexicalEditor(),
  secret: env.payloadSecret,
  db: postgresAdapter({ pool: { connectionString: env.databaseUrl } }),
  collections: [Images, Creators, ArtefactTypes, Sources, Series, Articles, Artefacts, Users],
  admin: { user: Users.slug },
  sharp,
  plugins,
  cors: [env.siteUrl],
  csrf: [env.siteUrl],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
