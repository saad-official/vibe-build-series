# Series plan

Date: 2026-10-03. Owner: Saad Khan (saad-official). Working folder: `G:\Vibe Engineering Apps`.

## Goals

1. Ship three real products that solve evidenced problems for small businesses.
2. Learn AI engineering patterns in production shape: agent loops, human-in-the-loop approval, document extraction with schemas, deterministic rules over model output, RAG where it earns its place, evals, observability.
3. Keep every service on a free plan. Vercel Hobby, Supabase Free, Stripe sandbox, Gemini and Groq free tiers.
4. Many small, meaningful commits. One public repo per product under `saad-official`.

## Selection method

Five parallel research passes (see `../research/`): SMB pain points, underserved niches, AI-agent demand vs saturation, regulation-driven needs, and free-tier feasibility. Candidates were scored on severity, frequency, buildability in 2–3 days, and crowdedness. Thin wrappers and saturated categories (writing tools, chatbots, notetakers, AI SDRs, review replies, receptionists) were excluded.

## Products

### 1. Dunnit — overdue-invoice chasing agent

- **Who:** agencies, consultancies, trades, B2B services on net-30 terms.
- **Evidence:** QuickBooks 2026 Late Payments Report (59% have invoices 30+ days overdue, $17.7K average owed); Bluevine Feb 2026 survey (29% of owners delayed paying themselves). Mid-market AR agents (Monk, Fazeshift) raised in 2026 but do not serve small customers.
- **What it does:** imports invoices (Stripe test invoices and CSV), scores risk, runs a four-step tone ladder of reminders, classifies replies (paid, promise-to-pay with date, dispute, wrong contact, out of office), pauses or reschedules cadences, escalates disputes, shows dollars recovered and days-sales-outstanding trend.
- **Agentic parts:** cadence planner, reply classifier with JSON schema, draft writer with tone policy, approval queue with confidence-based autonomy, append-only audit trail.
- **Demo mode:** reminders go to the owner's own inbox via Resend's shared sender; replies are injected through a demo inbox page and an inbound-webhook route that a real provider can hit later.

### 2. CertChase — certificate-of-insurance compliance

- **Who:** small general contractors, property managers, venues, franchise operators with 10–200 vendors.
- **Evidence:** 7 in 10 collected COIs are non-compliant; fewer than half of small firms have expiry alerts; incumbents start around $1,000/year.
- **What it does:** vendor roster with requirement templates per contract, upload or email-in ACORD 25 PDFs, Gemini vision extracts fields to a strict schema, a deterministic rule engine marks compliant / deficient (with the specific gap) / expiring, drafts broker chase emails for approval, red-amber-green status board, expiry cron.
- **Architecture story:** the model extracts, the rules decide. Field-level confidence with click-to-source highlighting.

### 3. Conformly — EU storefront compliance scanner

- **Who:** online shops selling to EU consumers, including non-EU Shopify merchants.
- **Evidence:** withdrawal function mandatory from 19 Jun 2026 (Directive 2023/2673); generic green claims banned from 27 Sep 2026 (Directive 2024/825); EAA in force since 28 Jun 2025; AI Act Article 50 chatbot disclosure since 2 Aug 2026. Warning-letter enforcement active in Germany and France.
- **What it does:** one URL in; crawl key pages; deterministic checks (withdrawal function, accessibility statement and complaint contact, cookie banner parity, imprint); LLM pass over copy for banned green claims and undisclosed AI chat widgets; pass/fail matrix with legal citation and copy-paste fixes; PDF report; monthly re-scan monitor with diff alerts.
- **Legal posture:** "issues found", never "compliant".

## Shared conventions

- Repo layout: `app/` (routes), `components/`, `lib/` (domain, ai, db, stripe), `supabase/migrations/`, `tests/`, `docs/` (spec, decisions, runbook), `.github/workflows/ci.yml`.
- Design: each product gets its own visual identity (type pairing, palette, layout rhythm). No default shadcn look, no generic gradient hero. Landing page, pricing, auth, dashboard, settings, and billing pages are mandatory.
- AI: one `lib/ai/model.ts` factory, model ids in config, JSON-schema outputs via Zod, every call logged with model, prompt version, tokens, latency. Gemini free-tier data terms mean no real customer PII goes to the model; demo data is synthetic.
- Jobs: Supabase pg_cron + pg_net calling `/api/cron/*` guarded by `CRON_SECRET`, plus one Vercel daily cron as keep-alive.
- Billing: Stripe sandbox per app, Checkout + Customer Portal, webhook handler with idempotency, plans gate features via a `plan` column on `organizations`.
- Testing: Vitest for domain logic (rule engines, classifiers' parsers, cadence math), Playwright smoke for auth + checkout, CI on every push.
- Commits: conventional prefixes (`feat:`, `fix:`, `chore:`, `docs:`, `test:`), small and frequent.

## Free-tier constraints that shape the design

| Constraint | Consequence |
|------------|-------------|
| Supabase Free: 2 active projects | Apps 1 and 2 get their own project; app 3 decided at build time (second org if allowed, otherwise shared project with its own schema). |
| Supabase pauses after 7 idle days | Daily keep-alive ping from Vercel cron or GitHub Actions. |
| Supabase built-in SMTP: 2 emails/hour | Auth via Google/GitHub OAuth and magic links only where needed; demo email via Resend shared sender. |
| Vercel Hobby cron: once a day | Frequent schedules run in pg_cron. |
| Vercel Hobby is non-commercial | Stripe stays in test mode; no real customers until a Pro plan. |
| Gemini free: Flash ~20 req/day, Flash-Lite ~500 req/day (verify in AI Studio) | Flash-Lite for extraction; Groq gpt-oss for text; aggressive caching; demo data small. |
| Groq free: 30 RPM, 8K TPM | Short prompts, batch sparingly, exponential backoff. |
| No email on vercel.app | Demo mode now; `EMAIL_PROVIDER` switch for a real domain later. |

## Build order and milestones

Build one product to completion before starting the next.

1. **Dunnit** — spec, scaffold, auth + orgs, invoices import, cadence engine, reply classifier, approval queue, dashboard, Stripe billing, landing page, cron, CI, deploy, README with demo walkthrough.
2. **CertChase** — same skeleton; extraction pipeline, rule engine, roster UI, chase flow, deploy.
3. **Conformly** — same skeleton; crawler, checks, claims linter, report PDF, monitor, deploy.

Each product's own `docs/spec.md` holds the detailed design; `docs/decisions/` holds architecture decision records.

## Human-only steps (done or pending)

- GitHub repos under saad-official — automated via gh.
- Vercel, Supabase, Stripe CLI logins — browser approvals by Saad.
- Gemini and Groq API keys — pasted by Saad into `G:\Vibe Engineering Apps\.secrets\`.
- Env vars on Vercel — Saad runs the provided `vercel env add` commands for secret values.
