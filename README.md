# Triz Contracting Website

Full-service contracting company website for Triz Contracting (Franklin, WI).
Multi-page React site with an Express + SQLite backend for reviews, gallery
photos, and contact/lead submissions.

## Structure

- `client/` — Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion frontend
- `server/` — Express + TypeScript + SQLite (better-sqlite3) backend API

## Getting started

```bash
npm run install:all   # installs deps for both client and server
npm run dev            # runs client (http://localhost:5173) and server (http://localhost:3001) together
```

The Vite dev server proxies `/api` and `/uploads` requests to the backend, so
the frontend works against the real API during development.

## Backend

On first run, the SQLite database (`server/data.sqlite3`, gitignored) is
created and seeded with placeholder reviews and gallery photos so the site
isn't empty out of the box.

Copy `server/.env.example` to `server/.env` and set `ADMIN_PASSWORD` to
manage reviews/gallery via the admin API:

- `POST /api/admin/login` — `{ password }` → `{ token }`
- `GET /api/reviews/admin/pending` — pending reviews awaiting approval (Bearer token)
- `PATCH /api/reviews/admin/:id/approve` — approve a review
- `POST /api/gallery/admin` — add a gallery item (multipart form: `title`, `category`, `before`, `after` image files)
- `GET /api/contact/admin` — view submitted leads (includes `photo_path` when a visitor attached a project photo)

No outbound email/SMS service is wired up yet — contact form submissions are
stored in the database and visible via the admin endpoint above. Wire up a
provider (e.g. Resend, Twilio) in `server/src/routes/contact.ts` when ready.

## Placeholder content

Business details (phone, email, address, logo, photos, service list, about
copy) are placeholders — search for `[PLACEHOLDER` and edit
`client/src/data/content.ts` to replace them with Andrew's real information.
