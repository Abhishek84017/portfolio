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
| `public/resume.pdf` | Resume served by the Nav and Hero download buttons. Generated from `resume/resume.html`. |
| `public/images/profile.png` | Profile photo (About section + hero avatar). |
| `public/images/projects/` | App icons and screenshots pulled from the Play Store listings. |

To add testimonials, fill `testimonials` in `data/testimonials.ts` — the section switches from the mentorship strip automatically.

## Contact form — email via Resend

Messages are emailed to you through [Resend](https://resend.com). Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
in `.env.local` (local) and in Vercel → Project → Settings → Environment Variables (production), then redeploy.
Replying to the email answers the visitor directly (their address is set as Reply-To).

Until a custom domain is verified in Resend, mail is sent from `onboarding@resend.dev` and can only be delivered
to the email your Resend account is registered with. After adding a domain, set `CONTACT_FROM_EMAIL`.

## Contact form archive — Supabase setup (optional, CLI)

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

## Updating the resume

Edit `resume/resume.html`, open it in Chrome, **Print → Save as PDF** (paper size Letter, margins "Default" — the page
margins are set in the file), and save over `public/resume.pdf`. Keep it to two pages.
