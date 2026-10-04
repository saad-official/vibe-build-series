# Free-tier verification for batch 3 (AI apps), 2026-10-04

Research agent with web search; every claim was read live on 2026-10-04 unless marked UNVERIFIED. Purpose: pick hosting, database, models, tracing and job infrastructure for Changelog Forge, DocPilot RN and Review Radar (Python FastAPI backends + Next.js frontends) with zero spend.

## Corrections to the journey's TECHNOLOGY_STACK.md (2026-09-05)

- Neon free storage is 1 GB per project (20 GB across projects), not 0.5 GB; 100 projects allowed.
- `gemini-embedding-2` is the newest embedding model; `gemini-embedding-001` remains stable and is incompatible with it.
- Helicone is in maintenance mode after the Mintlify acquisition (March 2026): avoid.
- Koyeb free and Hugging Face free Docker Spaces are gone for new accounts.

## 1. Hosting a FastAPI Docker service (1–2 GB image)

| Option | Facts | Verdict |
|---|---|---|
| Cloud Run | Always-free quota 2M requests, 180k vCPU-s, 360k GiB-s, 1 GB egress per month, but a billing account (card) is required. Cold start 1–3 s claimed for FastAPI (UNVERIFIED for a large image). | Best if a card is acceptable; set max-instances 1, min 0, budget alert. |
| Render free | 512 MB RAM, 0.1 CPU, 750 instance-hours per workspace per month, spins down after 15 min idle, wakes in about 1 min; no free cron or workers. | Only no-card option. One service can stay warm with a GitHub Actions ping; three cannot. 512 MB rules out local embedding models. |
| Hugging Face Spaces | Docker/Gradio on CPU Basic now need PRO; only static Spaces are free. | Out. |
| Koyeb | Free tier closed to new users since Feb 2026. | Out. |
| Fly.io | No free tier; trial only. | Out. |
| Railway | $5 one-time trial, then $1/month. | Marginal. |
| Vercel Python runtime | Not in the agent's scope; spiked separately (see decision records in the project repos). | Candidate for stateless APIs with QStash-driven jobs. |

## 2. Neon Free (FAQ updated 2026-10-01)

100 projects, 10 branches per project, 100 CU-hours per project per month, scale-to-zero after 5 minutes (cannot be disabled), 1 GB storage per project and 20 GB total, 5 GB egress per project. pgvector 0.8.x supported (plan gating UNVERIFIED, never seen restricted).

## 3. LLM APIs

| Provider | Facts |
|---|---|
| Gemini | No published free RPM/RPD table; limits visible only in AI Studio. `gemini-3.5-flash-lite` paid price $0.30/$2.50 per 1M tokens; free-tier prompts may be used to improve Google products (no customer PII). `gemini-embedding-001`: 2,048-token input, 128–3,072 dims, free quota UNVERIFIED (forum: 100 RPM, 30K TPM, 1,000 RPD). |
| Groq free | `openai/gpt-oss-20b`, `openai/gpt-oss-120b`, `qwen/qwen3.8-27b`: 30 RPM, 1K RPD, 8K TPM, 200K TPD each. No Llama on the free list. |
| OpenRouter | `:free` models: 20 RPM, 50 RPD (1,000 RPD after a one-time $10 purchase). Live list had 17 free models incl. `qwen/qwen3.8-27b:free` (262K), `google/gemma-4-31b-it:free` (262K), `nvidia/nemotron-3-super-120b-a12b:free` (262K), `nvidia/nemotron-3.5-lightning:free` (1M), `cohere/north-mini-code:free` (256K). Reliability UNVERIFIED. |

Rerankers and embeddings: Voyage gives 200M free tokens on `rerank-2.5`/`rerank-2.5-lite` and `voyage-4*` embeddings (no-card rate limit UNVERIFIED): best free choice. Jina: 10M one-time tokens, 100 RPM, CC-BY-NC models. Cohere trial: 10 req/min, 1,000 calls/month, evaluation only.

## 4. Observability

Langfuse Hobby: 50k units/month, 30-day retention, 2 users, unlimited projects, no card. Braintrust Starter: $10 credits, 1 GB processed data, 14-day retention (good for evals). Helicone: avoid.

## 5. Queues and schedules

Upstash QStash free: 1,000 messages/day, 10 schedules, 15-minute max HTTP response. Inngest Hobby: 50k executions/month. GitHub Actions cron: 5-minute minimum, delayed under load, disabled after 60 days without repo activity in public repos. Render cron: not free.

## 6. Documentation corpora for DocPilot RN

- Expo: `expo/expo`, `docs/pages/` (MIT). 1,801 MD/MDX files total (~12 MB); versioned folders `docs/pages/versions/vNN.0.0` (v54–v58 + unversioned) ~250 files each; unversioned guides ~490 files.
- React Native: `facebook/react-native-website`, `docs/` for current (237 files, ~1.6 MB); `website/versioned_docs` holds older versions. Content licence CC-BY 4.0 (attribute).

Recommendation: index one Expo SDK version plus the unversioned guides (~750 files) with the version as metadata; add a second version for the diff feature.

## 7. Review ingestion for Review Radar

- App Store RSS is live: `https://itunes.apple.com/{cc}/rss/customerreviews/page={n}/id={appId}/sortby=mostrecent/json`, 50 reviews per page, pages 1–10 (page 11 → 400), so about 500 recent reviews per country. Poll daily and de-duplicate to build history.
- Google Play: `google-play-scraper` (Node, facundoolano) is maintained (v10.1.3, 2026-05); the Python port is stale (2024). Unofficial endpoints, ToS position UNVERIFIED: keep ingestion behind an interface and offer CSV import.

## 8. GitHub for Changelog Forge

REST: 60 req/h unauthenticated per IP, 5,000/h with a token, 1,000/h per repo for `GITHUB_TOKEN` in Actions; secondary limits 100 concurrent, 900 points/min per endpoint. Actions minutes are free on public repos.

## Recommended stack

| Layer | Pick |
|---|---|
| API hosting | Vercel Python runtime if the spike holds (stateless, QStash-driven jobs); otherwise Render free with a GitHub Actions keep-alive on the app being demoed; Cloud Run when a card is acceptable |
| Database | Neon, one project per app, pgvector |
| LLM | Groq `gpt-oss-20b` (map/cheap) and `gpt-oss-120b` (reduce/capable), Gemini `3.5-flash-lite` fallback; OpenRouter `:free` as a third lane |
| Embeddings / rerank | Voyage free (200M tokens) or Gemini `gemini-embedding-001` |
| Tracing | Langfuse Hobby |
| Jobs | QStash queue, GitHub Actions cron for schedules |
| Data | Expo docs (MIT), React Native docs (CC-BY 4.0), App Store RSS, Google Play via the Node scraper with CSV fallback |
