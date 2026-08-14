# Arkiva

Arkiva is a migration-ready archive platform built with Next.js, Payload CMS, PostgreSQL, and Cloudflare R2.

## Architecture

- Next.js serves the public archive and Payload admin in one application.
- Payload provides editorial workflows at `/admin`.
- PostgreSQL stores structured metadata.
- R2 stores original images and generated WebP derivatives.
- Artefacts render at root URLs such as `/ons-indonesia` to preserve existing links.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `PAYLOAD_SECRET`.
2. Keep `DISABLE_R2=true` to store local uploads under `media/`.
3. Run `pnpm install`.
4. Run `pnpm migrate:create` and `pnpm migrate`.
5. Run `pnpm dev` and create the first administrator at `/admin`.

## Production media

Set `DISABLE_R2=false` and provide the R2 credentials in `.env`. `MEDIA_PUBLIC_URL` should be the existing Kabe R2 custom domain and `R2_PREFIX=arkiva` keeps Arkiva objects isolated inside the shared bucket.

The resulting object URLs follow this pattern:

```text
https://media.example.org/arkiva/001-unbreakable-catholic-home-front.webp
```

Keep the bucket private for archival originals if unrestricted downloads are not intended. The current image collection exposes uploaded files through `MEDIA_PUBLIC_URL`; introduce a separate private originals collection before ingesting restricted material.

## Importing data

### Complete Artefak Kita export

Set `ARTEFAKKITA_SITE_DIR` to the complete site export containing `site-content.json`, `pages/`, and `images/`, then run:

```sh
pnpm seed:artefakkita
```

The seed is idempotent. It imports all local media, artefacts, series, articles, creators, types, sources, descriptions, metadata, and legacy URLs. Existing records are updated by slug or filename.

### Generic CSV

Set `ARTEFACTS_CSV` and run:

```sh
pnpm import:artefacts
```

Expected headers are:

```text
id,title,slug,displayDate,yearStart,yearEnd,type,creators,series,source,summary,imageUrl,originalUrl
```

The importer updates records that already exist, creates missing taxonomy values, and deliberately refuses to create an artefact without an uploaded image. Download vendor-hosted images first, upload them to Arkiva, then rerun or complete the corresponding draft in Payload.

## Deployment

Run this as a conventional Node application behind Cloudflare DNS/CDN. This keeps Payload, Sharp, and PostgreSQL in their supported Node runtime while R2 handles media delivery.
