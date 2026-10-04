# Vibe Build Series

End-to-end SaaS products and AI agents for small businesses, built in public with AI pair-programming, on free tiers only.

Each product solves a problem backed by 2025–2026 evidence (surveys, regulation dates, incumbent pricing and complaints), not a "wrapper around a chat model". Every app ships with a landing page, authentication, a dashboard, Stripe (test mode) billing, background jobs, and a Vercel deployment.

## The products

| # | Product | Problem | Shape | Status |
|---|---------|---------|-------|--------|
| 1 | [Dunnit](https://github.com/saad-official/dunnit) · [live](https://getdunnit.vercel.app) | 59% of small businesses carry invoices 30+ days overdue (QuickBooks 2026). Reminders from accounting tools are static templates that cannot read replies. | AI agent: cadence, reply classification, approval queue, "$ recovered" dashboard | Live |
| 2 | [CertChase](https://github.com/saad-official/certchase) · [live](https://getcertchase.vercel.app) | 7 in 10 collected certificates of insurance are non-compliant; small contractors track them in spreadsheets and find out after a claim. | Document-AI vertical SaaS: vision extraction, deterministic rule engine, broker chasing | Live |
| 3 | [Conformly](https://github.com/saad-official/conformly) · [live](https://getconformly.vercel.app) | Four EU consumer-law rules landed in the last four months (withdrawal button 19 Jun 2026, green-claims ban 27 Sep 2026, EAA statement, AI-chatbot disclosure). No bundled scanner exists for small shops. | Compliance tool: crawler, rule checks, LLM claims linter, PDF report, monthly monitor | Live |

## Stack (all free tiers)

- Next.js 16 (App Router), React 19, TypeScript 5, Tailwind 4, shadcn/ui
- Supabase (Postgres, Auth, Storage, pg_cron) with SQL migrations as the source of truth for apps 1–2; Drizzle + Better Auth over plain Postgres for app 3
- Vercel AI SDK 7 with Gemini (Flash-Lite for extraction and vision) and Groq (gpt-oss for drafting and classification)
- Stripe sandboxes: Checkout, Customer Portal, subscriptions, webhooks
- Vercel Hobby for hosting, Vercel Analytics, Sentry free tier
- Email in demo mode (Resend shared sender to the owner's inbox; inbound replies simulated) until a custom domain exists

See [docs/plan.md](docs/plan.md) for the full plan and [research/](research/) for the market research that picked these problems.

## Why

To learn AI engineering by shipping, to show that small teams can build real products with AI assistance, and to keep a public record of the work.
