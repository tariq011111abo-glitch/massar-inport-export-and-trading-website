# Massar for Import Export and Trading

موقع تعريفي وتجاري متعدد اللغات لشركة **Massar** في ماليزيا، مع لوحة إدارة وقاعدة بيانات PostgreSQL/Neon.

This is a brochure and catalogue site, not an online shop.

## Stack

- Next.js App Router
- PostgreSQL via Drizzle ORM
- Compatible with **Neon**, **Vercel**, and **GitHub**
- Admin console at `/console`
- English, Bahasa Melayu, Arabic (RTL)

## Admin

URL: `/console`

- Email: `admin@massar-group.com`
- Password: `MassarAdmin2026!`

Change the password after the first production login.

## 1) Create the database (Neon)

1. Open [https://console.neon.tech](https://console.neon.tech) and create a project, e.g. `massar`.
2. Copy the connection string. Use the **pooled** URL if available.
3. It looks like:

```
postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require
```

4. From this project folder run:

```bash
cp .env.example .env
```

5. Put the Neon URL in `.env`:

```
DATABASE_URL=postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require
AUTH_SECRET=a-long-random-string
NEXT_PUBLIC_SITE_URL=https://www.massar-group.com
```

6. Create tables:

```bash
npm install
npx drizzle-kit push
```

The first visit to the website seeds demo content automatically.

## 2) GitHub

```bash
git init
git add .
git commit -m "Launch Massar website and admin CMS"
git branch -M main
git remote add origin https://github.com/YOUR_USER/massar-website.git
git push -u origin main
```

Never commit `.env`. Only `.env.example` is tracked.

## 3) Vercel

1. Import the GitHub repository in [Vercel](https://vercel.com).
2. Framework: Next.js.
3. Add environment variables:

| Name | Value |
| --- | --- |
| `DATABASE_URL` | Neon connection string |
| `AUTH_SECRET` | long random secret |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` or the company domain |

4. Deploy.
5. After the first successful deploy, open the site once so the database is seeded.
6. Attach `www.massar-group.com` in Vercel → Domains.

Images uploaded from the admin are stored in the database, so they persist on Vercel.

## Local development

```bash
npm install
npx drizzle-kit push
npm run dev
```

The local default database is:

```
postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

## Notes

- No cart, checkout, or payment gateway.
- Marketplace icons appear only when a URL is saved and enabled.
- Content is managed from `/console` without changing code.
