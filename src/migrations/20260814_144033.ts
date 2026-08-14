import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sources" ADD COLUMN "url" varchar;
  ALTER TABLE "series" ADD COLUMN "source_url" varchar;
  ALTER TABLE "_series_v" ADD COLUMN "version_source_url" varchar;
  ALTER TABLE "articles" ADD COLUMN "author" varchar;
  ALTER TABLE "articles" ADD COLUMN "body_markdown" varchar;
  ALTER TABLE "articles" ADD COLUMN "source_url" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_author" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_body_markdown" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_source_url" varchar;
  ALTER TABLE "artefacts" ADD COLUMN "creator_role" varchar;
  ALTER TABLE "artefacts" ADD COLUMN "holding_collection" varchar;
  ALTER TABLE "artefacts" ADD COLUMN "object_detail" varchar;
  ALTER TABLE "_artefacts_v" ADD COLUMN "version_creator_role" varchar;
  ALTER TABLE "_artefacts_v" ADD COLUMN "version_holding_collection" varchar;
  ALTER TABLE "_artefacts_v" ADD COLUMN "version_object_detail" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sources" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "series" DROP COLUMN IF EXISTS "source_url";
  ALTER TABLE "_series_v" DROP COLUMN IF EXISTS "version_source_url";
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "author";
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "body_markdown";
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "source_url";
  ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_author";
  ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_body_markdown";
  ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_source_url";
  ALTER TABLE "artefacts" DROP COLUMN IF EXISTS "creator_role";
  ALTER TABLE "artefacts" DROP COLUMN IF EXISTS "holding_collection";
  ALTER TABLE "artefacts" DROP COLUMN IF EXISTS "object_detail";
  ALTER TABLE "_artefacts_v" DROP COLUMN IF EXISTS "version_creator_role";
  ALTER TABLE "_artefacts_v" DROP COLUMN IF EXISTS "version_holding_collection";
  ALTER TABLE "_artefacts_v" DROP COLUMN IF EXISTS "version_object_detail";`)
}
