import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_series_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__series_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_artefacts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__artefacts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('editor', 'administrator');
  CREATE TABLE IF NOT EXISTS "images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"source_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_detail_url" varchar,
  	"sizes_detail_width" numeric,
  	"sizes_detail_height" numeric,
  	"sizes_detail_mime_type" varchar,
  	"sizes_detail_filesize" numeric,
  	"sizes_detail_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "creators" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "artefact_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "series" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"cover_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_series_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_series_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_cover_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__series_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"cover_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_cover_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "artefacts_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "artefacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"display_date" varchar,
  	"decade" numeric,
  	"year_start" numeric,
  	"year_end" numeric,
  	"type_id" integer,
  	"source_id" integer,
  	"summary" varchar,
  	"description" jsonb,
  	"featured" boolean DEFAULT false,
  	"legacy_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_artefacts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "artefacts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "artefacts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"creators_id" integer,
  	"series_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_artefacts_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_artefacts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_display_date" varchar,
  	"version_decade" numeric,
  	"version_year_start" numeric,
  	"version_year_end" numeric,
  	"version_type_id" integer,
  	"version_source_id" integer,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_featured" boolean DEFAULT false,
  	"version_legacy_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__artefacts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_artefacts_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_artefacts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"creators_id" integer,
  	"series_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"images_id" integer,
  	"creators_id" integer,
  	"artefact_types_id" integer,
  	"sources_id" integer,
  	"series_id" integer,
  	"articles_id" integer,
  	"artefacts_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "series" ADD CONSTRAINT "series_cover_image_id_images_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_series_v" ADD CONSTRAINT "_series_v_parent_id_series_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_series_v" ADD CONSTRAINT "_series_v_version_cover_image_id_images_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_images_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_cover_image_id_images_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artefacts_images" ADD CONSTRAINT "artefacts_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artefacts_images" ADD CONSTRAINT "artefacts_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."artefacts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artefacts" ADD CONSTRAINT "artefacts_type_id_artefact_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."artefact_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artefacts" ADD CONSTRAINT "artefacts_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artefacts_texts" ADD CONSTRAINT "artefacts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artefacts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artefacts_rels" ADD CONSTRAINT "artefacts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artefacts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artefacts_rels" ADD CONSTRAINT "artefacts_rels_creators_fk" FOREIGN KEY ("creators_id") REFERENCES "public"."creators"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artefacts_rels" ADD CONSTRAINT "artefacts_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v_version_images" ADD CONSTRAINT "_artefacts_v_version_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v_version_images" ADD CONSTRAINT "_artefacts_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_artefacts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v" ADD CONSTRAINT "_artefacts_v_parent_id_artefacts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artefacts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v" ADD CONSTRAINT "_artefacts_v_version_type_id_artefact_types_id_fk" FOREIGN KEY ("version_type_id") REFERENCES "public"."artefact_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v" ADD CONSTRAINT "_artefacts_v_version_source_id_sources_id_fk" FOREIGN KEY ("version_source_id") REFERENCES "public"."sources"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v_texts" ADD CONSTRAINT "_artefacts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_artefacts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v_rels" ADD CONSTRAINT "_artefacts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_artefacts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v_rels" ADD CONSTRAINT "_artefacts_v_rels_creators_fk" FOREIGN KEY ("creators_id") REFERENCES "public"."creators"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artefacts_v_rels" ADD CONSTRAINT "_artefacts_v_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creators_fk" FOREIGN KEY ("creators_id") REFERENCES "public"."creators"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_artefact_types_fk" FOREIGN KEY ("artefact_types_id") REFERENCES "public"."artefact_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_artefacts_fk" FOREIGN KEY ("artefacts_id") REFERENCES "public"."artefacts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "images_updated_at_idx" ON "images" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "images_created_at_idx" ON "images" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "images_filename_idx" ON "images" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "images_sizes_card_sizes_card_filename_idx" ON "images" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "images_sizes_detail_sizes_detail_filename_idx" ON "images" USING btree ("sizes_detail_filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "creators_slug_idx" ON "creators" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "creators_updated_at_idx" ON "creators" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "creators_created_at_idx" ON "creators" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "artefact_types_slug_idx" ON "artefact_types" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "artefact_types_updated_at_idx" ON "artefact_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "artefact_types_created_at_idx" ON "artefact_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "sources_slug_idx" ON "sources" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "sources_updated_at_idx" ON "sources" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "sources_created_at_idx" ON "sources" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "series_slug_idx" ON "series" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "series_cover_image_idx" ON "series" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "series_updated_at_idx" ON "series" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "series_created_at_idx" ON "series" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "series__status_idx" ON "series" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_series_v_parent_idx" ON "_series_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_series_v_version_version_slug_idx" ON "_series_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_series_v_version_version_cover_image_idx" ON "_series_v" USING btree ("version_cover_image_id");
  CREATE INDEX IF NOT EXISTS "_series_v_version_version_updated_at_idx" ON "_series_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_series_v_version_version_created_at_idx" ON "_series_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_series_v_version_version__status_idx" ON "_series_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_series_v_created_at_idx" ON "_series_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_series_v_updated_at_idx" ON "_series_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_series_v_latest_idx" ON "_series_v" USING btree ("latest");
  CREATE UNIQUE INDEX IF NOT EXISTS "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_cover_image_idx" ON "_articles_v" USING btree ("version_cover_image_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "artefacts_images_order_idx" ON "artefacts_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "artefacts_images_parent_id_idx" ON "artefacts_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "artefacts_images_image_idx" ON "artefacts_images" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "artefacts_slug_idx" ON "artefacts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "artefacts_decade_idx" ON "artefacts" USING btree ("decade");
  CREATE INDEX IF NOT EXISTS "artefacts_type_idx" ON "artefacts" USING btree ("type_id");
  CREATE INDEX IF NOT EXISTS "artefacts_source_idx" ON "artefacts" USING btree ("source_id");
  CREATE INDEX IF NOT EXISTS "artefacts_updated_at_idx" ON "artefacts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "artefacts_created_at_idx" ON "artefacts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "artefacts__status_idx" ON "artefacts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "artefacts_texts_order_parent_idx" ON "artefacts_texts" USING btree ("order","parent_id");
  CREATE INDEX IF NOT EXISTS "artefacts_rels_order_idx" ON "artefacts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "artefacts_rels_parent_idx" ON "artefacts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "artefacts_rels_path_idx" ON "artefacts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "artefacts_rels_creators_id_idx" ON "artefacts_rels" USING btree ("creators_id");
  CREATE INDEX IF NOT EXISTS "artefacts_rels_series_id_idx" ON "artefacts_rels" USING btree ("series_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_images_order_idx" ON "_artefacts_v_version_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_images_parent_id_idx" ON "_artefacts_v_version_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_images_image_idx" ON "_artefacts_v_version_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_parent_idx" ON "_artefacts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_version_slug_idx" ON "_artefacts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_version_decade_idx" ON "_artefacts_v" USING btree ("version_decade");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_version_type_idx" ON "_artefacts_v" USING btree ("version_type_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_version_source_idx" ON "_artefacts_v" USING btree ("version_source_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_version_updated_at_idx" ON "_artefacts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_version_created_at_idx" ON "_artefacts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_version_version__status_idx" ON "_artefacts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_created_at_idx" ON "_artefacts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_updated_at_idx" ON "_artefacts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_latest_idx" ON "_artefacts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_texts_order_parent_idx" ON "_artefacts_v_texts" USING btree ("order","parent_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_rels_order_idx" ON "_artefacts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_rels_parent_idx" ON "_artefacts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_rels_path_idx" ON "_artefacts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_rels_creators_id_idx" ON "_artefacts_v_rels" USING btree ("creators_id");
  CREATE INDEX IF NOT EXISTS "_artefacts_v_rels_series_id_idx" ON "_artefacts_v_rels" USING btree ("series_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_images_id_idx" ON "payload_locked_documents_rels" USING btree ("images_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_creators_id_idx" ON "payload_locked_documents_rels" USING btree ("creators_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_artefact_types_id_idx" ON "payload_locked_documents_rels" USING btree ("artefact_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("sources_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_series_id_idx" ON "payload_locked_documents_rels" USING btree ("series_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_artefacts_id_idx" ON "payload_locked_documents_rels" USING btree ("artefacts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "images" CASCADE;
  DROP TABLE "creators" CASCADE;
  DROP TABLE "artefact_types" CASCADE;
  DROP TABLE "sources" CASCADE;
  DROP TABLE "series" CASCADE;
  DROP TABLE "_series_v" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "artefacts_images" CASCADE;
  DROP TABLE "artefacts" CASCADE;
  DROP TABLE "artefacts_texts" CASCADE;
  DROP TABLE "artefacts_rels" CASCADE;
  DROP TABLE "_artefacts_v_version_images" CASCADE;
  DROP TABLE "_artefacts_v" CASCADE;
  DROP TABLE "_artefacts_v_texts" CASCADE;
  DROP TABLE "_artefacts_v_rels" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_series_status";
  DROP TYPE "public"."enum__series_v_version_status";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_artefacts_status";
  DROP TYPE "public"."enum__artefacts_v_version_status";
  DROP TYPE "public"."enum_users_role";`)
}
