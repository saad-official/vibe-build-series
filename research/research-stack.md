# Zero-cost SaaS stack research (3 small apps) - observed 2026-10-03

Method: WebFetch on official docs (primary), WebSearch (secondary), and live `registry.npmjs.org` queries for versions. Every item was observed on **2026-10-03** unless stated. Confidence tags: [OFFICIAL] = vendor doc fetched today; [SECONDARY] = third-party/blog/search summary, verify before relying; [UNCLEAR] = vendor does not publish, or sources conflict.

Local machine facts (checked 2026-10-03): Windows 10 Pro, Node v20.13.1, npm 10.5.2, `winget` and `gh` present; `vercel`, `supabase`, `stripe`, `scoop` NOT installed.

---

## 0. Biggest gotchas (read first)

1. **Vercel Hobby is non-commercial only.** Anything taking payment from visitors, ads, affiliate-primary, or "receiving payment to create/update/host the site" is commercial and needs Pro. Stripe Checkout (even test mode) on a public site is a gray area; a portfolio demo with no real money and no client paying you is the safe reading. Client work = commercial. https://vercel.com/docs/limits/fair-use-guidelines (last_updated 2026-09-14) [OFFICIAL].
2. **Supabase Free = 2 active projects total** (across orgs), so 3 apps do not fit 1:1. Options: share one project via separate schemas/RLS (weaker isolation), or pause one (paused projects don't count). https://supabase.com/docs/guides/platform/billing-on-supabase [OFFICIAL].
3. **Supabase built-in SMTP is effectively unusable**: 2 emails/hour AND only to pre-authorized addresses (org team members). Custom SMTP is mandatory for real signup flows. https://supabase.com/docs/guides/auth/auth-smtp and /auth/rate-limits [OFFICIAL].
4. **No transactional email provider works with a `*.vercel.app` domain** (you cannot add DNS records to vercel.app, so SPF/DKIM verification is impossible). A real domain (~$10-12/yr) is needed for real email. Resend's `onboarding@resend.dev` only delivers to your own account email.
5. **Vercel Hobby cron = once per day, imprecise (+/-59 min).** More-frequent expressions FAIL the deployment. https://vercel.com/docs/cron-jobs/usage-and-pricing (last_updated 2026-07-15) [OFFICIAL].
6. **Local Node 20.13.1 is too old.** shadcn CLI 4.21.1 needs >=20.18.1; AI SDK 7 needs Node 22+; Vercel announced Node 20 deprecation on 2026-10-01 and its default is 24.x. Install Node 24 LTS before scaffolding.
7. **Groq removed Llama 3.1 8B / 3.3 70B** (shutdown 2026-08-16). A code generator trained earlier will hard-code dead model IDs.
8. **Gemini free-tier data is used to improve Google products** (human review possible), except for EEA/UK/Switzerland users. Do not send customer data.
9. **Stripe CLI login now needs an Administrator to enable "CLI access"** in the Dashboard (for CLI > v1.50.0) and browser approval of a pairing code.
10. **TypeScript 7.0 (Go rewrite) is npm `latest` (7.0.2)** but the programmatic compiler API is deferred to 7.1, so typescript-eslint, ts-jest, ts-node etc. may break [SECONDARY]. Pin TypeScript to the last 5.x/6.x line until verified.

---

## 1. Vercel Hobby plan

| Item | Limit | Source |
|---|---|---|
| Fast Data Transfer (bandwidth) | first 100 GB/mo | https://vercel.com/docs/plans/hobby (2026-09-14) [OFFICIAL] |
| Fast Origin Transfer | 10 GB/mo | same |
| CDN requests | 1,000,000/mo | same |
| Function invocations | 1,000,000/mo | same + fair-use page |
| Active CPU / Provisioned memory | 4 CPU-hrs/mo / 360 GB-hrs/mo | same |
| Function duration | 300 s default AND max (Fluid compute). Legacy non-Fluid projects deployed before 2025-04-23: 10 s default / 60 s max | https://vercel.com/docs/functions/limitations (2026-08-24); /docs/limits |
| Function memory | 2 GB / 1 vCPU (fixed on Hobby) | functions/limitations |
| Function bundle | 250 MB uncompressed (500 MB Python); 5 GB "large functions" beta | same |
| Request/response body | 4.5 MB hard limit (413 FUNCTION_PAYLOAD_TOO_LARGE) | same |
| Cron jobs | 100 per project, but **minimum once/day**, precision +/-59 min (e.g. `0 1 * * *` runs any time 1:00-1:59) | cron usage-and-pricing [OFFICIAL] |
| Build | 45 min per deployment; 1 concurrent build; 2 vCPU / 8 GB RAM / 32 GB disk | https://vercel.com/docs/limits (2026-09-16) |
| Deployments | 100/day (also 100/hour, 60 per 5 min); CLI source upload 100 MB | same |
| Projects / domains | 200 projects; 50 domains per project; 25 projects per Git repo; 5 deploy hooks | same |
| Env vars | max 1000 per environment per project; 64 KB total (and max single value) for Node runtimes | same |
| Teams | Hobby = single user, no team collaboration. Team creation limited to 5/day. **Hobby cannot connect repos owned by a GitHub organization** (personal-account repos only) | limits + plans/hobby |
| Runtime logs | 1 hour retention | same |
| Web Analytics | 50,000 events/mo shared across team, 1-month window, no custom events; collection pauses after limit (3-day grace, resumes after 7 days) | https://vercel.com/docs/analytics/limits-and-pricing (2026-08-25) |
| Speed Insights | 10,000 events / 30 days shared | plans/hobby |
| Over-limit behavior | No overage billing; feature blocked until 30 days pass | plans/hobby |

Commercial-use wording (short, verbatim): "Hobby teams are restricted to non-commercial personal use only." Commercial = any deployment "used for the purpose of financial gain of anyone involved in any part of the production of the project, including a paid employee or consultant writing the code" (examples: requesting/processing payment from visitors, advertising a product/service, ads such as AdSense, affiliate linking as primary purpose). "Asking for Donations does not fall under commercial usage." https://vercel.com/docs/limits/fair-use-guidelines [OFFICIAL].

Node on Vercel: 24.x (default), 22.x, 20.x (deprecation announced for 2026-10-01). https://vercel.com/docs/functions/runtimes/node-js/node-js-versions.

---

## 2. Supabase Free plan

| Item | Free-plan value | Source |
|---|---|---|
| Projects | 2 active (paused don't count) | https://supabase.com/docs/guides/platform/billing-on-supabase [OFFICIAL] |
| DB size | 500 MB per project; shared CPU, 500 MB RAM | https://supabase.com/pricing [OFFICIAL] |
| Auth MAU | 50,000 (unlimited total users); auth audit logs 1 hour | pricing |
| Storage | 1 GB, 50 MB max upload; egress 5 GB + 5 GB cached | pricing |
| Edge Functions | 500,000 invocations/mo; up to 100 functions; 150 s duration; 256 MB memory; 20 MB bundle (local) / 5 MB (server-side bundling) | pricing + https://supabase.com/docs/guides/functions/limits |
| Realtime | 200 concurrent connections, 2M messages/mo, 100 msg/s, 256 KB broadcast payload | https://supabase.com/docs/guides/realtime/limits |
| Backups / PITR / branching | none on Free; logs 1 day | pricing |
| Pausing | Auto-pause after low activity over **7 days**; warning email ~1 week before, confirmation email after; restore possible up to **1 year** after pause | https://supabase.com/docs/guides/platform/free-project-pausing [OFFICIAL] |
| How to avoid pausing | "a few user requests to the database each day over the previous week" suffices; activity includes API calls, dashboard visits. Practical: scheduled external ping (GitHub Actions / Vercel daily cron) doing a trivial PostgREST SELECT. Exact threshold is unpublished [UNCLEAR]. Paid plans never pause. | same + search [SECONDARY] |
| pg_cron | Supabase Cron (pg_cron) documented for all projects; schedules from every second to yearly; recommended <=8 concurrent jobs, each <=10 min; can run SQL, DB functions, or HTTP (e.g. Edge Functions). No Free-plan exclusion stated on the page. https://supabase.com/docs/guides/cron [OFFICIAL] |
| Auth rate limits | built-in email **2/hour**, only to org members, "no SLA", limits "can change without notice"; with custom SMTP default 30/hour (adjustable); sign-ups/sign-ins 30 per 5 min per IP; token endpoint 150 per 5 min per IP; OTP/magic link 60 s per user; SMS 30/hour | https://supabase.com/docs/guides/auth/rate-limits and /auth/auth-smtp |
| Custom SMTP needed? | **Yes** for anything beyond org members. Documented providers: Resend, AWS SES, Postmark, SendGrid, ZeptoMail, Brevo | auth-smtp |
| API keys | New `sb_publishable_...` / `sb_secret_...` keys; legacy anon/service_role JWT keys deprecated by "end of 2026"; both coexist now. CLI: `supabase projects api-keys --project-ref <ref>` | https://supabase.com/docs/guides/api/api-keys |

---

## 3. Google Gemini API free tier (AI Studio)

- Billing account needed? **No.** "Active project or free trial" tier; a linked billing account is only for Tier 1+. https://ai.google.dev/gemini-api/docs/billing and https://ai.google.dev/gemini-api/docs/rate-limits (doc dated 2026-09-02) [OFFICIAL].
- Models with Free Tier = Yes (official pricing page https://ai.google.dev/gemini-api/docs/pricing): Gemini 3.8 Flash, 3.7 Flash, 3.6 Flash, 3.5 Flash, 3.5 Flash-Lite, 3.1 Flash-Lite, 3 Flash Preview, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, Gemini Embedding 2, Gemma 4, several Live/TTS/Transcribe models. Free = No: 3.1 Pro Preview, Omni Flash, all image-generation models, 2.5 Flash Image. A third-party source says Pro models became paid-only on 2026-04-01 while the official page still lists 2.5 Pro as free: treat 2.5 Pro as unreliable.
- **RPM / RPD / TPM per model: [UNCLEAR - not published in docs].** Google says limits are "not guaranteed" and only visible per project in the signed-in AI Studio dashboard (https://aistudio.google.com/rate-limit requires login; I could not read it). Third-party (Sept 2026, https://www.scriptbyai.com/gemini-api-free-tier-limits/ [SECONDARY]): about 20 RPD for Gemini 3.8/3.7/3.6/3.5 Flash; about 500 RPD for 3.5/3.1 Flash-Lite; RPD resets at midnight Pacific. Published fixed limits: Google Search / Maps grounding 500 requests/day (shared, 2.5 Flash/Flash-Lite). **Human action: read the real numbers in AI Studio once and record them.**
- Data use (https://ai.google.dev/gemini-api/terms): unpaid-service content is used "to provide, improve, and develop Google products"; human reviewers may read it; "Do not submit sensitive, confidential, or personal information". EEA/UK/Switzerland: paid-service data terms apply even to the free tier.
- Practical: Flash-Lite for volume, Flash for quality; handle 429 with backoff; no real user PII in free-tier calls.

## 4. Groq free tier

Source: https://console.groq.com/docs/rate-limits (fetched twice; the summarizer returned slightly different row subsets, so confirm in the console at `settings/limits`) [OFFICIAL, partly UNCLEAR].

| Model | RPM | RPD | TPM | TPD |
|---|---|---|---|---|
| openai/gpt-oss-120b | 30 | 1K | 8K | 200K |
| openai/gpt-oss-20b | 30 | 1K | 8K | 200K |
| openai/gpt-oss-safeguard-20b | 30 | 1K | 8K | 200K |
| qwen/qwen3.8-27b (replaces qwen3.6-27b) | 30 | 1K | 8K | 200K |
| whisper-large-v3 / -turbo | 20 | 2K | - | - |
| llama-prompt-guard-2-22m / 86m | 30 | 14.4K | 15K | 500K |
| canopylabs orpheus TTS (arabic-saudi / english) | 10 | 100 | 1.2K | 3.6K |

- Deprecations (https://console.groq.com/docs/deprecations): llama-3.1-8b-instant and llama-3.3-70b-versatile shut down 2026-08-16 (replace with gpt-oss-20b / gpt-oss-120b); qwen3-32b and llama-4-scout shut down 2026-07-17; groq/compound(+mini) shut down 2026-09-21. A [SECONDARY] search result says the Llama models went "Enterprise-only" on 2026-08-26; either way they are gone from the free tier.
- Context: models page says up to 131,072 tokens (https://console.groq.com/docs/models); qwen3.8-27b stated as 131K. The 8K TPM is the real bottleneck: one big prompt can burn a minute of quota.
- Credit-card requirement and data-use terms were not on any page I could fetch [UNCLEAR].

## 5. Stripe test mode

- No business verification needed: "After you create a Stripe account, Stripe places you in a sandbox" with test API keys. https://docs.stripe.com/testing-use-cases [OFFICIAL].
- Environments: one "test mode sandbox" (shares some settings with live mode, cannot be deleted) plus up to **5 general sandboxes** (isolated settings, deletable, v1+v2 API; Stripe recommends these for new integrations).
- Checkout, subscriptions and Customer Portal all work in a sandbox. Portal is configured in the Dashboard separately per sandbox / live (https://docs.stripe.com/customer-management/integrate-customer-portal); Preview is read-only; test via customer > Actions > Open customer portal. A product catalog is only needed if customers can upgrade/downgrade.
- Test clocks ("simulations") https://docs.stripe.com/billing/testing/test-clocks/api-advanced-usage: max 3 customers per clock, 3 subscriptions per customer, 10 unattached quotes; time only moves forward; advance up to 2 billing intervals at a time; auto-deleted 30 days after creation; bank-debit collection not simulated; subscription API limits 10 invoices/sub/min, 20/sub/day, 200 quantity updates/sub/hour.
- Stripe sends no customer emails in sandboxes by default (only manually sent invoices/receipts).
- Webhooks locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` prints a `whsec_` signing secret; `stripe trigger <event>` fires fixtures (checkout.session.completed, customer.subscription.*, invoice.* supported: https://docs.stripe.com/stripe-cli/triggers). A deployed app needs a real webhook endpoint created in the sandbox Dashboard/API.
- stripe-node 23.0.0 pins API version `2026-09-30.endive` (see section 11).

## 6. Transactional email free tiers

| Provider | Free limits | Domain requirement | Works with vercel.app? | Source |
|---|---|---|---|---|
| Resend | 100/day, 3,000/mo, 3 domains, 30-day retention; marketing: 1,000 contacts | Verified domain needed to send to anyone but your own account email. `onboarding@resend.dev` -> own email only (403 otherwise) | No | https://resend.com/pricing, https://resend.com/docs/knowledge-base/resend-sending-limits, Resend 403 KB [OFFICIAL/SECONDARY] |
| Brevo | 300/day, SMTP relay + API + webhooks on free, Brevo branding | Sender-domain auth (SPF/DKIM/DMARC) required; unauthenticated mail goes out from brevosend.com (since Feb 2024) | No for proper sending | https://www.brevo.com/free-smtp-server/ [SECONDARY: pricing page fetch failed; verify 300/day] |
| Postmark | 100/mo, no overage, never expires, no card, sandbox mode | Manual account approval (~1 business day); before approval you can only send within your verified domain; sender signature needed | No | https://postmarkapp.com/pricing + wpmailsmtp docs [OFFICIAL/SECONDARY] |
| Loops | 4,000 sends/mo to your 1,000 newest contacts (rolling 30 days), 10 emails/s, "Powered by Loops" footer, unlimited seats | Verified sending domain required for the transactional API (test sends to @example.com/@test.com are no-ops) | No | https://loops.so/pricing, https://loops.so/docs/transactional [OFFICIAL] |

Recommendation: **Resend** (best DX, native Supabase SMTP support, React Email). Needs one custom domain. Brevo is the volume fallback (300/day).

## 7. Background jobs / cron

| Option | Free limit | Notes | Source |
|---|---|---|---|
| Vercel Cron | 100 jobs/project but 1x/day, +/-59 min precision on Hobby | Invokes a function; same-repo simplicity | https://vercel.com/docs/cron-jobs/usage-and-pricing |
| Supabase pg_cron (+pg_net) | any schedule down to seconds; <=8 concurrent, <=10 min each recommended | In-DB; can call Edge Functions/HTTP; stops if the project is paused | https://supabase.com/docs/guides/cron |
| Upstash QStash | 1,000 msgs/day, 10 active schedules, 10 queues, 1 MB message, 7-day max delay, 3-day logs, 50 GB/mo | Retries/delays/fan-out | https://upstash.com/pricing/qstash |
| Inngest | 50k executions/mo, 5 concurrent steps, 3 workers, 500k events | Durable multi-step workflows; each step is an execution | https://www.inngest.com/pricing |
| Trigger.dev | $5/mo compute credit, 20 concurrent runs, 5 members, 1-day log retention | No timeouts; more wiring | https://trigger.dev/pricing |
| GitHub Actions `schedule` | min every 5 min; delays at top of hour; public-repo schedules auto-disabled after 60 days without repo activity; default branch only; 2,000 min/mo private, unlimited public | Good for pings/keep-alive | https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows ; https://docs.github.com/en/billing/concepts/product-billing/github-actions |

**Recommendation: Supabase pg_cron + pg_net as the primary scheduler** (frequent jobs, no extra vendor, free), calling protected Next.js route handlers (`Authorization: Bearer $CRON_SECRET`) or Edge Functions. Keep one **Vercel daily cron** (or a GitHub Actions schedule) as an external Supabase keep-alive. Add Inngest only if a feature needs durable multi-step workflows. Caveat: pg_cron stops when a project is paused, so the keep-alive must originate outside the DB.

## 8. Domains

- `*.vercel.app` is fine for portfolio demos (HTTPS included, zero cost) but cannot carry email DNS records and looks less credible for client demos.
- Free options [SECONDARY]: `*.is-a.dev` (GitHub PR registration, DNS via Cloudflare; https://is-a.dev/), `eu.org` (free, slow manual approval; https://nic.eu.org), `js.org` (JS projects only). Freenom shut down in 2024; one July 2026 report says it returned selling .tk/.gq/.cf from EUR 8.22/yr (not free). Whether is-a.dev/eu.org permit MX/TXT/DKIM records needed for email is [UNCLEAR]; verify before relying.
- Cheapest reliable: Cloudflare Registrar at-cost (.xyz about US$12.30 first year per tld-list type sites [SECONDARY]); Porkbun/Namecheap also cheap. One domain plus subdomains per app covers all 3 apps and email (use a `mail.` subdomain for Resend). Vercel Hobby allows 50 domains per project.

## 9. Monitoring / analytics

| Tool | Free tier | Source |
|---|---|---|
| Vercel Web Analytics | 50k events/mo, 1-month window, no custom events | https://vercel.com/docs/analytics/limits-and-pricing [OFFICIAL] |
| Vercel Speed Insights | 10k events / 30 days | plans/hobby [OFFICIAL] |
| Sentry Developer | 1 user, 5,000 errors, 50 replays, 5M spans, 30-day retention (promo: 5,000 replays/mo first 3 months) | https://sentry.io/pricing/ [OFFICIAL] |
| PostHog | 1M events, 5k session replays, 1M flag requests, 100k errors, 1-year retention, unlimited seats (pricing page fetch had no numbers) | costbench/search [SECONDARY] |
| Umami Cloud Hobby | 100k events/mo, 3 websites, 6 months (official pricing fetch had no numbers); self-host is free | search [SECONDARY] |

Pick: Vercel Analytics (zero setup) + Sentry free for errors; PostHog if product analytics/flags are needed. Hobby runtime logs are only 1 hour, so Sentry matters.

## 10. PDF generation and scraping within Vercel limits

Hard constraints: 300 s, 2 GB RAM, 250 MB bundle, **4.5 MB request/response body** (return PDFs via Supabase Storage / Vercel Blob URL, not as the function response).

- `@react-pdf/renderer` 4.9.0: pure JS, no browser; best default for invoices/reports. Node runtime only (not Edge).
- Headless Chrome on Vercel: `@sparticuz/chromium` 153.0.0 + `puppeteer-core` 25.12.0 / `playwright-core` 1.63.0 exist on npm; plausible within 250 MB / 2 GB but cold starts are slow and I did not verify current Vercel compatibility [UNCLEAR]. Use only if HTML-to-PDF fidelity is required.
- Browserless free: 1k units/mo, 2 concurrent browsers, 2-minute max session, proxies/captcha solving included. https://www.browserless.io/pricing [OFFICIAL]
- Firecrawl free: 1,000 credits/mo, 2 concurrent, 10 req/min on scrape/map/search, 2 req/min on crawl/agent. https://www.firecrawl.dev/pricing [OFFICIAL]
- Jina Reader (`https://r.jina.ai/<url>`): 20 RPM without a key; 500 RPM with a free key plus 10M free tokens. https://jina.ai/reader/ [OFFICIAL]. Best cheap "URL -> markdown" for LLM pipelines.

## 11. Recommended versions (npm `latest` queried 2026-10-03) and breaking changes

| Package | Latest | Notes |
|---|---|---|
| next | 16.3.8 (2026-09-30), Node >=20.9 | No Next 17 found (canary is 16.4.0) |
| react / react-dom | 19.3.0 (2026-09-09) | View Transitions, Fragment Refs, `browser()`, Trusted Types (https://react.dev/blog) |
| tailwindcss, @tailwindcss/postcss | 4.3.3 | CSS-first config |
| shadcn (CLI) | 4.21.1 (2026-10-01), Node >=20.18.1 | `npx shadcn@latest`; unified `cn` package (Sep 2026) |
| @supabase/supabase-js | 2.117.2 | |
| @supabase/ssr | 0.12.7 | |
| stripe (node) | 23.0.0 (2026-09-30) | API `2026-09-30.endive` |
| @stripe/stripe-js | 10.0.0 | |
| ai (Vercel AI SDK) | 7.0.127; @ai-sdk/google 4.0.87; @ai-sdk/groq 4.0.54; @ai-sdk/react 4.0.130 | Gemini and Groq providers both exist |
| zod | 4.6.5 | |
| drizzle-orm / drizzle-kit | 0.45.3 / 0.31.11 (npm `latest`) | blog claims about 1.0 conflict [UNCLEAR] |
| @playwright/test | 1.63.0 | |
| typescript | 7.0.2 (Go-native) | pin 5.x/6.x for now |
| eslint | 10.12.0 | flat config only |
| vercel CLI / supabase CLI / @stripe/cli | 62.2.0 / 2.119.0 / 1.53.0 | |
| resend 6.32.0; inngest 4.21.1; @sentry/nextjs 11.4.0; @vercel/analytics 2.0.1; lucide-react 1.51.0 | | |

**Drizzle vs Supabase migrations:** with Supabase Free + RLS + auth + pg_cron all expressed in SQL, use **Supabase CLI migrations (`supabase/migrations/*.sql`) as the single source of truth** and `supabase db push`. Add Drizzle only as a typed query layer if wanted. Two migration systems cause drift.

### Breaking changes a model trained earlier will likely get wrong

Next.js 16 (https://nextjs.org/docs/app/guides/upgrading/version-16, lastUpdated 2026-08-25):
- `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are **async only** (sync compat removed). `await props.params`; `npx next typegen` gives `PageProps<'/x/[id]'>`.
- `middleware.ts` becomes **`proxy.ts`** exporting `proxy()`; proxy is Node runtime only (no edge).
- Turbopack is default for dev AND build; a custom `webpack` config fails `next build` unless `--webpack`.
- `next lint` removed; `next build` no longer lints; use ESLint CLI/Biome with flat config; `eslint` key in next.config removed.
- `revalidateTag(tag)` needs a 2nd argument (`'max'`); new `updateTag`, `refresh`; `cacheLife`/`cacheTag` stable; `experimental.ppr/dynamicIO/useCache` replaced by `cacheComponents`.
- `next/image`: `images.domains` deprecated (use `remotePatterns`), `qualities` default `[75]`, `minimumCacheTTL` 4h, local src with query strings needs `localPatterns`.
- Parallel route slots require `default.tsx`; AMP and `serverRuntimeConfig/publicRuntimeConfig` removed; Node >=20.9; TS >=5.1.

Tailwind v4 (https://tailwindcss.com/docs/upgrade-guide): no `tailwind.config.js` by default (CSS `@theme`; `@config` to opt in); `@import "tailwindcss"` replaces `@tailwind` directives; PostCSS plugin is `@tailwindcss/postcss`; renamed utilities (`shadow-sm`->`shadow-xs`, `outline-none`->`outline-hidden`, `ring`->`ring-3`); important suffix `flex!`; `bg-(--var)`; default border/ring colour is now `currentColor`; `@utility` replaces `@layer utilities`.

React 19: `ref` is a plain prop (no forwardRef), `use()`, Actions/`useActionState`/`useFormStatus`; 19.2/19.3 add `useEffectEvent`, `<Activity>`, View Transitions.

Supabase SSR (https://supabase.com/docs/guides/auth/server-side/nextjs): only `cookies: { getAll, setAll }` (never get/set/remove); env `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (not ANON_KEY); refresh tokens in `proxy.ts` (Next 16) via `supabase.auth.getClaims()`; never trust `getSession()` server-side; new server client per request; refresh-token reuse can sign users out if refreshed in two places.

Stripe node 22/23: `new Stripe(key)` required (ES6 class, v22); `constructEventWithoutVerification` removed; Node 18 dropped; webhook default tolerance; `payment_method_types` removed on several PaymentIntent endpoints. Stripe also promotes Accounts v2 as the customer model (preview); stay on Customers v1 unless needed.

AI SDK 7 (https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0): Node 22+, ESM-only; `system` -> `instructions`; `stepCountIs` -> `isStepCount`; `fullStream` -> `stream`; `onFinish` -> `onEnd`; Google `createGoogleGenerativeAI` -> `createGoogle`; telemetry moved to `@ai-sdk/otel`; codemod `npx @ai-sdk/codemod v7`. Env vars: `GOOGLE_GENERATIVE_AI_API_KEY`, `GROQ_API_KEY`.

Zod 4: `z.email()`/`z.uuid()` top-level, `message` -> `error`, `.merge` deprecated, `z.record` needs 2 args, `z.function()` is a factory.

TypeScript 7 [SECONDARY]: strict by default, `types` defaults to `[]`, `baseUrl`, `moduleResolution: node10`, `target: es5` removed; compiler API deferred to 7.1.

ESLint 10: legacy `.eslintrc` dropped.

## 12. Automating project creation from this Windows machine

| Tool | Install on Windows | Auth | Human step? |
|---|---|---|---|
| Vercel CLI 62.2.0 | `npm i -g vercel` (needs Node 22/24); experimental native binary `pnpm i -g @vercel/vc-native -f` | `vercel login` = **OAuth 2.0 device flow** (email and `--github` style flags retired 2026-02-26: https://vercel.com/changelog/new-vercel-cli-login-flow). Automation: human creates token at https://vercel.com/account/tokens; set `VERCEL_TOKEN` (preferred) or `--token` | Yes, once |
| Supabase CLI 2.119.0 | **Scoop**: `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git` then `scoop install supabase`; or per-project `npm i -D supabase` + `npx supabase`. **Global `npm i -g supabase` is NOT supported.** Docker only for `supabase start` | `supabase login` opens browser; or `supabase login --token` / env `SUPABASE_ACCESS_TOKEN` (human creates PAT in dashboard) | Yes, once |
| Stripe CLI 1.53.0 | `winget install Stripe.StripeCLI`; Scoop (`scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git`, `scoop install stripe`); `npm i -g @stripe/cli`; or GitHub release zip | `stripe login`: pairing code + browser approval; CLI > v1.50 needs an Admin/IAM Admin to enable CLI access (Dashboard > Settings > Team and security > MCP and CLI access); `stripe login --non-interactive` prints JSON {browser_url, verification_code, next_step}; `--interactive` accepts an API key | Yes (approval + admin toggle) |

Command sketches (agent-runnable after tokens exist):
- Vercel: `vercel link --yes` (or `vercel project add <name>`), `vercel git connect` (personal GitHub repo only on Hobby), `echo $VAL | vercel env add NAME production`, `vercel env pull`, `vercel deploy --prod`, `vercel crons add --path /api/cron --schedule "0 10 * * *"` (beta). Env-var creation API limit 120/min. Marketplace route `vercel integration add supabase` exists in CLI help; terms-acceptance behavior [UNCLEAR, untested].
- Supabase: `supabase orgs list` -> `supabase projects create <name> --org-id <id> --db-password <pw> --region <r>` (fails if you already have 2 active free projects) -> `supabase link --project-ref <ref>` -> `supabase db push` -> `supabase projects api-keys --project-ref <ref>` (pipe keys straight into Vercel env, never log).
- Stripe: `stripe listen --forward-to ...`, `stripe trigger checkout.session.completed`; create products/prices via API with the sandbox secret key. Creating the sandbox itself is a Dashboard action; scripting it is [UNCLEAR].
- GitHub: `gh` is installed (verify `gh auth status`; memory notes global identity is SadiPro07). Hobby repos must live under a personal account, not an org.

---

## STACK DECISION (one page)

**Hosting/runtime:** Next.js 16.3 (App Router, `proxy.ts`, async request APIs) + React 19.3 + Tailwind 4.3 + shadcn 4 on **Vercel Hobby**; Node 24 LTS; TypeScript pinned to 5.x/6.x (not 7.0.2 yet); ESLint 10 flat config.

**Data/Auth/Storage:** **Supabase Free**, Supabase CLI migrations as source of truth, RLS, publishable/secret keys, `@supabase/ssr` getAll/setAll + `getClaims`. Only 2 active free projects: give apps 1 and 2 their own projects; app 3 shares a project (own schema) or stays paused/portfolio-only. Daily external keep-alive ping.

**Jobs:** Supabase pg_cron + pg_net -> `/api/cron/*` route handlers guarded by `CRON_SECRET`; one Vercel daily cron as external heartbeat; Inngest only if durable multi-step workflows appear.

**AI:** Vercel AI SDK 7 with `@ai-sdk/google` (Gemini 3.5 Flash-Lite for volume, Flash for quality; no PII; confirm limits in AI Studio) and `@ai-sdk/groq` (`openai/gpt-oss-120b` / `20b`; 30 RPM, 8K TPM, 200K TPD) as fallback. One `model()` factory so model IDs are config.

**Payments:** Stripe **sandboxes** (a general sandbox per app, test keys), Checkout + Customer Portal + subscriptions, test clocks for renewals, `stripe listen` locally. Treat apps as non-commercial demos under Hobby terms; going live means Vercel Pro.

**Email:** Resend free (100/day) via Supabase custom SMTP and app emails; needs one custom domain, about $12/yr (Cloudflare Registrar .xyz) - the only unavoidable cash cost. If strictly $0: ship demos with OAuth (Google/GitHub) logins and no transactional email.

**Observability:** Vercel Web Analytics + Sentry free; PostHog optional.

**PDF/scrape:** `@react-pdf/renderer` + Storage URLs (4.5 MB body cap); Jina Reader / Firecrawl free for scraping; Browserless as last resort.

**Domains:** `*.vercel.app` for demos; one paid domain with subdomains for anything needing email.

### Human-only (the agent cannot do these)
1. Install Node 24 LTS (and optionally scoop); approve installer/UAC prompts.
2. Vercel: sign in (GitHub login), approve `vercel login` device code OR create `VERCEL_TOKEN`; install the Vercel GitHub app on the personal account; accept Hobby terms.
3. Supabase: sign in, create org, create a Personal Access Token, note org-id; accept terms; decide which apps get dedicated projects.
4. Stripe: create account (email verification), enable CLI access (Admin toggle), approve `stripe login` pairing code; create general sandboxes; configure Customer Portal per sandbox; hand over sandbox test keys via a secure store.
5. Google AI Studio: sign in, create API key, read actual per-model RPM/RPD/TPM, accept terms. Groq: sign in, create API key, check `settings/limits`.
6. Resend (and optional Brevo/Sentry/PostHog): create accounts and API keys; buy the domain (payment is human-only); add or delegate DNS records; confirm DKIM verification.
7. GitHub: confirm the personal account owns the repos (Hobby cannot use org repos); provide any PAT needed.
8. Decide commercial-use boundary (client-paid work means Vercel Pro).

### Agent can automate (once the tokens above exist)
- Scaffold Next 16 / Tailwind 4 / shadcn apps; write `proxy.ts`, Supabase SSR clients, Stripe route handlers, AI SDK 7 wiring, react-pdf routes, Sentry/Analytics setup.
- `supabase projects create/link/db push/api-keys`; SQL migrations including `cron.schedule(...)` + `pg_net` jobs and RLS policies.
- `vercel link`, `vercel env add/pull`, `vercel deploy`, `vercel crons add`, `vercel git connect`.
- `stripe listen/trigger`; create products/prices/webhook endpoints via API; test-clock scripts; Playwright E2E (Checkout with the 4242 test card).
- GitHub Actions keep-alive and CI workflows; `vercel usage` checks; `.env.example`, `AGENTS.md` (`npx @next/codemod@canary agents-md`), runbooks.

### Open / unclear items to resolve
- Real Gemini per-model free quotas (login-gated); Groq credit-card requirement and data terms; whether is-a.dev/eu.org allow email DNS records; Brevo 300/day and PostHog/Umami numbers (secondary sources); whether Stripe sandbox creation can be scripted; `@sparticuz/chromium` on the current Vercel runtime; whether pg_cron-only activity counts toward Supabase pause avoidance (assume no, ping externally); Drizzle 1.0 status; TypeScript 7 ecosystem breakage (secondary sources).

## Source URL index (all observed 2026-10-03)
- Vercel (https://vercel.com): /docs/limits, /docs/plans/hobby, /docs/limits/fair-use-guidelines, /docs/cron-jobs/usage-and-pricing, /docs/functions/limitations, /docs/analytics/limits-and-pricing, /docs/cli, /docs/cli/login, /changelog/new-vercel-cli-login-flow, /docs/functions/runtimes/node-js/node-js-versions
- Supabase (https://supabase.com): /pricing, /docs/guides/platform/billing-on-supabase, /docs/guides/platform/free-project-pausing, /docs/guides/auth/rate-limits, /docs/guides/auth/auth-smtp, /docs/guides/realtime/limits, /docs/guides/functions/limits, /docs/guides/cron, /docs/guides/api/api-keys, /docs/guides/auth/server-side/nextjs, /docs/guides/local-development/cli/getting-started, /docs/reference/cli/supabase-login, /docs/reference/cli/supabase-projects-create
- Google: https://ai.google.dev/gemini-api/docs/pricing, /rate-limits, /billing, https://ai.google.dev/gemini-api/terms
- Groq: https://console.groq.com/docs/rate-limits, /models, /deprecations
- Stripe: https://docs.stripe.com/testing-use-cases, /test-mode, /billing/testing/test-clocks/api-advanced-usage, /customer-management/integrate-customer-portal, /cli/login, /cli/install, /stripe-cli/triggers; https://github.com/stripe/stripe-cli; stripe-node CHANGELOG (raw.githubusercontent.com)
- Email: https://resend.com/pricing, https://resend.com/docs/knowledge-base/resend-sending-limits, https://postmarkapp.com/pricing, https://loops.so/pricing, https://loops.so/docs/transactional, https://www.brevo.com/free-smtp-server/
- Jobs: https://upstash.com/pricing/qstash, https://www.inngest.com/pricing, https://trigger.dev/pricing, GitHub docs (links in section 7)
- Monitoring/scrape: https://sentry.io/pricing/, https://www.browserless.io/pricing, https://www.firecrawl.dev/pricing, https://jina.ai/reader/, costbench PostHog summary and Umami search summaries
- Frameworks: https://nextjs.org/docs/app/guides/upgrading/version-16, https://tailwindcss.com/docs/upgrade-guide, https://ui.shadcn.com/docs/changelog, https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0, https://ai-sdk.dev/providers/ai-sdk-providers/groq and /google-generative-ai, https://zod.dev/v4/changelog, https://react.dev/blog; versions from https://registry.npmjs.org/<pkg>
