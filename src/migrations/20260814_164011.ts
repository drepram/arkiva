import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "artefacts" ADD COLUMN "sort_order" numeric DEFAULT 0;
  ALTER TABLE "_artefacts_v" ADD COLUMN "version_sort_order" numeric DEFAULT 0;
  UPDATE "artefacts" AS artefact
  SET "sort_order" = (
    SELECT substring(image."filename" from '^([0-9]{3})')::numeric
    FROM "artefacts_images" AS relation
    JOIN "images" AS image ON image."id" = relation."image_id"
    WHERE relation."_parent_id" = artefact."id"
      AND image."filename" ~ '^[0-9]{3}-'
    ORDER BY relation."_order"
    LIMIT 1
  )
  WHERE EXISTS (
    SELECT 1
    FROM "artefacts_images" AS relation
    JOIN "images" AS image ON image."id" = relation."image_id"
    WHERE relation."_parent_id" = artefact."id"
      AND image."filename" ~ '^[0-9]{3}-'
  );
  UPDATE "_artefacts_v" AS version
  SET "version_sort_order" = (
    SELECT substring(image."filename" from '^([0-9]{3})')::numeric
    FROM "_artefacts_v_version_images" AS relation
    JOIN "images" AS image ON image."id" = relation."image_id"
    WHERE relation."_parent_id" = version."id"
      AND image."filename" ~ '^[0-9]{3}-'
    ORDER BY relation."_order"
    LIMIT 1
  )
  WHERE EXISTS (
    SELECT 1
    FROM "_artefacts_v_version_images" AS relation
    JOIN "images" AS image ON image."id" = relation."image_id"
    WHERE relation."_parent_id" = version."id"
      AND image."filename" ~ '^[0-9]{3}-'
  );
  CREATE INDEX IF NOT EXISTS "artefacts_sort_order_idx" ON "artefacts" USING btree ("sort_order");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_version_sort_order_idx" ON "_artefacts_v" USING btree ("version_sort_order");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "artefacts_sort_order_idx";
  DROP INDEX IF EXISTS "_artefacts_v_version_version_sort_order_idx";
  ALTER TABLE "artefacts" DROP COLUMN IF EXISTS "sort_order";
  ALTER TABLE "_artefacts_v" DROP COLUMN IF EXISTS "version_sort_order";`)
}
