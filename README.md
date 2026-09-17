# Abhishek Patel — Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Supabase · Vercel.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm lint
```

## Where things live

| Path | What |
| --- | --- |
| `data/` | All site copy — `profile`, `skills`, `experience`, `projects`, `testimonials`, `education`. Edit here, not in components. |
| `app/globals.css` | Design tokens (§4 palette, dark + light), fluid type scale, focus / selection styles, keyframes. |
| `components/sections/` | One file per page section, in page order. |
| `components/motion/` | `Reveal`, `Stagger`, `CountUp` — the shared expo-out motion primitives. |
| `app/actions/contact.ts` | Contact form Server Action → Supabase insert. |
| `supabase/migrations/` | `contact_messages` table + RLS (insert-only for the anon role). |
| `public/resume.pdf` | Resume served by the Nav and Hero download buttons. |
| `public/images/profile.png` | Profile photo (About section + hero avatar). |
| `public/images/projects/` | App icons and screenshots pulled from the Play Store listings. |

To add testimonials, fill `testimonials` in `data/testimonials.ts` — the section switches from the mentorship strip automatically.

## Contact form — Supabase setup (CLI)

```bash
brew install supabase/tap/supabase
supabase login
supabase init                                  # keeps the existing supabase/migrations folder
supabase link --project-ref <your-project-ref> # after creating the project
supabase db push                               # applies the contact_messages migration
```

Then copy `.env.example` to `.env.local` and set `SUPABASE_URL` and `SUPABASE_ANON_KEY`
(Project Settings → API). Add the same two variables in Vercel → Project → Settings → Environment Variables.

Until they are set, the form shows a designed "not connected yet — email me directly" state instead of failing silently.
Read submissions in the Supabase dashboard (Table Editor → `contact_messages`); the anon key cannot read them back.

## Deploying

Import the repo in Vercel — no config needed. `metadataBase` falls back to the Vercel production URL, so Open Graph
tags work on `*.vercel.app` out of the box. When a custom domain is added, set `NEXT_PUBLIC_SITE_URL` to it.
