# AI-Agent Market Research: What to Avoid, What to Build (SMB focus)

*Research date: 2026-10-03. Sources: web search (extended mode). Each claim lists its source and date where one could be found. Numbers marked "(vendor blog)" come from vendors marketing their own product, so treat them as directional, not audited.*

---

## 0. TL;DR

- **The market has split.** Thin wrappers (a UI on top of a model API) are crowded, low-margin, and churn fast. **Narrow, vertical agents that own a workflow, take an action and have a measurable outcome are getting funded and paid for.** YC W26's largest category is "AI-native service": the AI does the job end to end and the customer supervises or approves the output (56 of 199 companies, 28%) ([Extruct, 2026-03-25](https://www.extruct.ai/research/ycw26/)).
- **Avoid:** writing/content generators, generic support chatbots, meeting notetakers, autonomous AI SDRs, chat-with-PDF, headshot/logo/resume generators, generic "agent builders", and horizontal "AI assistant for everything".
- **Build:** small-business back-office agents that move money in or out (overdue-invoice chasing, quote follow-up, bill capture), compliance-chasing agents (COI tracking, security questionnaires), and agents that turn a specific vertical's inbox into structured actions (freight quotes, supplier RFQs, insurance renewals). All of these have a human approval step and a dollar metric.
- **Top picks for a 2-3 day portfolio build:**
  1. Speed-to-lead inbound agent: highest score, best live demo.
  2. Overdue-invoice chasing agent on a QuickBooks/Xero sandbox: strongest dollar story.
  3. Estimate/quote follow-up agent for trades.
  4. Supplier RFQ multi-party agent: most memorable demo.
  5. Shopify reorder agent: fills the gap left when Stocky shut down on 2026-08-31.

---

## A. SATURATED / "AI SLOP" CATEGORIES (AVOID LIST)

### Market-level evidence

| Signal | Data | Source |
|---|---|---|
| Product Hunt flood | 3,869 launches in H1 2026, peaking at 900 in April. 49% of launches are AI (61% in March). Average upvotes fell from 190 to 144 as volume grew, so attention is spread thinner. | [anysite.io, 2026](https://anysite.io/blog/who-actually-launched-on-product-hunt-in-2026/); [hunted.space monthly history](https://hunted.space/history-monthly) |
| PH winners are all agents | All 8 completed monthly winners in 2026 are AI, and 7 of 8 are explicitly agents or agent tooling. The bar is now "agent that does work", not "AI feature". | [anysite.io, 2026](https://anysite.io/blog/who-actually-launched-on-product-hunt-in-2026/) |
| AI app churn | RevenueCat State of Subscription Apps 2026: paid AI apps churn **30% faster** than non-AI apps. Annual retention is 21.1% vs 30.7%, and refund rates are 20% higher. | [TechCrunch, 2026-03-10](https://techcrunch.com/2026/03/10/ai-powered-apps-struggle-with-long-term-retention-new-report-shows); [RevenueCat](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026) |
| Tool-stacking fatigue | Users pay for about 4 AI tools (around $66/mo), and 53% cancel and restart tools as needed. | [readless.app, 2026](https://www.readless.app/blog/subscription-fatigue-statistics-2026) |
| Wrapper economics | Thin wrappers run 25-35% gross margins vs 70-85% for traditional SaaS. One blog claims "AI tools" is the most crowded category it tracks, with 1,213 startups and a $7 median MRR (unverified secondary claim). | [groovyweb, 2026](https://www.groovyweb.co/blog/best-ai-saas-product-ideas-2026); [aimagicx, 2026](https://www.aimagicx.com/blog/vertical-ai-micro-saas-business-model-2026) |
| Agent-washing | Gartner: over 40% of agentic AI projects will be scrapped by 2027. Of the thousands of vendors calling themselves agentic, only about 130 are "real"; the rest relabel chatbots, RPA or assistants as agents. | [Outlook Business / Gartner](https://www.outlookbusiness.com/artificial-intelligence/over-40-of-agentic-ai-projects-will-be-scrapped-by-2027-says-gartner) |
| Buyer mood | HN trend digests for June-July 2026 describe a "quality backlash" against slop: buyers want governed, auditable systems, and simple "X-for-Y" SaaS clones are seen as killable by coding agents. | [mean.ceo HN Trends June 2026](https://blog.mean.ceo/hacker-news-trends-june-2026/); [HN "AI agents are starting to eat SaaS"](https://news.ycombinator.com/item?id=46268452) |
| Where VC money goes | Bessemer: vertical AI could be 10x larger than vertical SaaS because it competes for labor spend (13% of US GDP) rather than IT spend (1%). LLM-native vertical AI companies are growing about 400% YoY at about 65% gross margin. a16z Big Ideas 2026: "multiplayer" vertical AI that coordinates people, agents and external parties. | [vccafe Vertical AI 2026](https://www.vccafe.com/vertical-ai-in-2026-the-good-the-bad-and-the-ugly/) |
| YC 2026 RFS | 15 categories, heavy on AI-native services, vertical agents ("agents that do the job, not suggest it"), AI-native agencies, and vertical AI for compliance-heavy industries. | [ycinsight RFS 2026](https://ycinsight.com/yc-request-for-startups) |

### AVOID list

| # | Category | Why avoid (evidence) |
|---|---|---|
| 1 | **AI writing / blog / copy / email writers** | 100+ funded competitors, and the feature is now built into every email client and doc editor ([preuve.ai](https://preuve.ai/blog/startup-ideas-2026); [groovyweb](https://www.groovyweb.co/blog/best-ai-saas-product-ideas-2026)). It is also the most common SMB AI use (68% use AI for marketing content, per [lilachbullock 2026](https://www.lilachbullock.com/ai-adoption-statistics-small-business/)), so ChatGPT and Gemini already serve it for free. Reads as slop by default. |
| 2 | **Generic customer-support chatbots / "chat on your website"** | Incumbents have commoditized it. Intercom Fin is $0.99 per resolution on top of a seat ([gleap, 2026](https://www.gleap.io/blog/intercom-fin-ai-pricing-2026)). Sierra raised at a $15.8B valuation (May 2026) with $100M+ ARR. "Chatbot development" is a top Upwork AI-automation posting type (282 in May 2026), so every freelancer already sells it ([Upwatcher](https://www.upwatcher.io/market/ai-automation/)). |
| 3 | **Meeting notetakers / summarizers** | Mature market (Otter, Fireflies, Fathom, Granola, Fellow, Notta). Fireflies gives unlimited transcription free ([TechRepublic 2026](https://www.techrepublic.com/article/news-best-ai-meeting-note-takers-2026/)). Granola already pushes notes into HubSpot and Attio ([Granola](https://www.granola.ai/blog/connect-granola-attio-complete-integration-guide)). "Meeting-to-CRM" alone is no longer a differentiated product. |
| 4 | **Autonomous AI SDRs / volume cold outbound** | 11x reportedly lost 70-80% of customers within 3 months and overstated ARR (about $3M real vs $14M claimed). 47% of AI-SDR deployments hit domain-reputation problems within 90 days. Artisan is rated about 3.5 on G2 ([deathtocoldemails post-mortem](https://deathtocoldemails.com/ai-sdr-post-mortem/); [digitalapplied 2026](https://www.digitalapplied.com/blog/ai-sdr-agents-2026-buyers-guide-landscape-pricing)). This category is the definition of "AI slop" to buyers. |
| 5 | **Chat-with-PDF / doc Q&A / "second brain"** | Absorbed by ChatGPT, Gemini (2M-token context) and Claude file upload. These are the canonical "feature, not company" startups ([Decrypt](https://decrypt.co/203920/openai-pdf-chatbot-ai-startups-sherlocked); [CNBC 2026-06-01](https://www.cnbc.com/2026/06/01/ai-startup-valuations-pre-chatgpt.html)). YC's "Company Brain" RFS is enterprise-scale, not a weekend build. |
| 6 | **Headshot / logo / avatar / resume builders** | Listed as oversaturated, with incumbents having collapsed margins ([preuve.ai](https://preuve.ai/blog/startup-ideas-2026)). One-shot consumer generation is exactly the pattern behind RevenueCat's churn numbers. |
| 7 | **Generic "agent builder" / no-code agent platforms** | n8n leads Upwork AI-automation postings at 16.1% (534), ahead of Zapier (396) and Make (355) ([Upwatcher](https://www.upwatcher.io/market/ai-automation/)). Zapier Agents, Hostinger "AI agents" and the hyperscalers all compete here. You cannot win horizontally, and a portfolio clone looks derivative. |
| 8 | **Social-media content schedulers + AI captions/video** | A common n8n template and a common SMB use. AI video generation is the fastest-growing freelance skill (+329%) ([Upwork In-Demand Skills 2026](https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work)), so the space is flooded with supply. |
| 9 | **AI voice receptionists for home services** (caution, not hard avoid) | The demand is real: about 27% of calls missed and around $1,200 lost per missed call (vendor blog) ([getnextphone](https://www.getnextphone.com/blog/is-ai-receptionist-reliable)). But it is crowded: NextPhone, Goodcall, Smith.ai, Synthflow, Dialzara, My AI Front Desk, and even 11x. Voice also needs paid telephony, so free tiers will not cover it. |
| 10 | **Large-multifamily leasing / resident AI** | EliseAI raised $350M at a $4B valuation on 2026-09-29, has $200M ARR, and covers 1 in 6 US apartments ([SiliconANGLE 2026-09-29](https://siliconangle.com/2026/09/29/eliseai-raises-350m-to-enhance-its-ai-work-automation-suite/)). Haven, Super and Vellum also target property managers. Only the small-landlord / back-office slice is open. |
| 11 | **AI resume screening for hiring** (caution) | The pain is real: about 244 applications per role, and 69% of organizations get AI-written resumes ([goperfect](https://www.goperfect.com/blog/top-resume-screening-platforms-for-2026-what-recruiting-teams-actually-need); [recruit2](https://recruit2.com/ai-recruitment-tools/)). But it is legally high-risk (NYC LL144 bias audits; the EU AI Act treats hiring as high-risk) and crowded at the enterprise level. A poor portfolio choice unless the tool only ranks and never auto-rejects. |

**Rule of thumb from the evidence:** if ChatGPT, Gemini or the customer's existing SaaS can do it in one prompt, or the output is content rather than a completed business action, it reads as a wrapper.

---

## B. UNDERSERVED AGENTIC WORKFLOWS SMBs PAY FOR

### Demand context

- **SMB adoption is broad but shallow.** 87% of small business owners use at least one AI tool, mostly general chat, and only 56% are highly confident users ([Bluehost 2026 study, 350 SMBs](https://www.bluehost.com/state-of-small-business-ai-confidence)).
  - 74% report productivity gains, but for most the gains are under 25%.
  - **ROI uncertainty (24%)** is the #2 barrier, after data security/compliance (27%) ([Upwork State of AI in SMBs 2026](https://www.upwork.com/resources/state-of-ai-in-smbs); [TechInformed](https://techinformed.com/smbs-test-ai-agents-before-roi-is-proven-upwork-finds/)).
  - **This argues for products that show dollars recovered or hours saved.**
- **Agent pilots outnumber non-adopters in every SMB function.** Workflow automation is piloted by 34% vs 2% not considering; autonomous task execution by 30% vs 6% ([Upwork](https://www.upwork.com/resources/state-of-ai-in-smbs)).
- **Top agent use cases (Zapier 2026 survey):** data management/entry (47%), document analysis (41%), support triage (41%), report generation (36%) ([Zapier](https://zapier.com/blog/ai-agents-survey/)).
- **Freelance demand as a proxy for unmet automation.** About 100 new Upwork AI-automation postings per day (3,324 in May 2026). Top asks are lead gen (275), marketing automation (272), chatbots (282) and scraping (+87.5%). The median fixed budget is $150, and Next.js front ends are up 128.6%. *"Buyers increasingly want the automation wrapped: a real front end, a feed of fresh data, and a named business process"* ([Upwatcher, data to 2026-06-30](https://www.upwatcher.io/market/ai-automation/)).
- **Most-deployed SMB n8n workflows:** email triage + reply drafts, invoice processing + payment reminders, inbound lead qualification ([dev.to 2026](https://dev.to/automatewithai/5-n8n-workflows-every-small-business-should-automate-in-2026-2c6e); [readyn8ntemplates](https://www.readyn8ntemplates.com/best-n8n-workflows-for-small-businesses/)).
- **What works in production:** "narrow, well-instrumented workflows ship while broad autonomy stalls," with human-in-the-loop as the 2026 standard ([ecorpit 2026](https://ecorpit.com/enterprise-ai-agents-production-use-cases-2026/); [dev.to 2026](https://dev.to/auraveni/ai-agents-for-business-whats-actually-working-in-2026-l8)).

### Common build stack (applies to all opportunities)

- **Next.js (App Router) on Vercel.** Server Actions for approvals; route handlers for webhooks.
- **Supabase**
  - Postgres with RLS for multi-tenant orgs, plus Auth.
  - **pg_cron + pg_net** to call Edge Functions on a schedule. Vercel Hobby cron is daily-only, so use Supabase for anything more frequent.
  - **Realtime** to push new items into the approval queue.
  - Storage for uploaded documents; **pgvector** for retrieval.
- **LLM**
  - **Gemini Flash / Flash-Lite free tier** for extraction, with JSON-schema output and PDF/vision input. Pro models were removed from the free tier on 2026-04-01. Flash-Lite has the most generous daily quota. Reported per-model RPD varies widely between sources, so check your project's live quota in AI Studio ([tinkerllm](https://tinkerllm.com/blog/gemini-api-free-tier-limits-rate-quotas/); [pecollective](https://pecollective.com/tools/gemini-free-tier-guide/)).
  - **Groq free tier** for fast drafting and classification: Llama 3.3 70B at about 1,000 RPD, Llama 3.1 8B at about 14,400 RPD, 30 RPM, limits per org ([eesel](https://eesel.ai/blog/groq-pricing)).
  - Put both behind one `llm.ts` adapter with fallback, and log model, prompt version and token count per call.
- **Free sandboxes for real integrations:** Intuit QuickBooks Online sandbox, Xero demo company, Shopify dev store, Gmail API (OAuth test users), HubSpot free CRM/dev account, and Resend or Postmark for outbound and inbound email.

---

### 1. Overdue-invoice chasing agent (AR collections for SMBs)

- **Workflow:** watch unpaid invoices, run a polite-to-firm reminder cadence, read replies ("paid last week", "dispute", "we'll pay on the 15th"), update status, and escalate disputes.
- **Who pays:** agencies, consultancies, trades, and B2B SMBs on net-30 terms; also bookkeepers who manage 20-50 clients.
- **Evidence:**
  - QuickBooks 2026 Late Payments Report: **59% of small businesses have invoices 30+ days overdue (up from 47%)**, $17.7K owed on average, and 59% paid fees to access money they had already earned ([QuickBooks](https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/); [KEYT/Stacker, 2026-07-20](https://keyt.com/stacker-small-business/2026/07/20/report-finds-more-small-businesses-are-carrying-overdue-invoices-than-last-year/); [Crowdfund Insider, 2026-04](https://www.crowdfundinsider.com/2026/04/270533-overdue-invoices-now-a-major-challenges-for-smes-report-claims/)).
  - Funding validates the category: **Monk $25M Series A (Apr 2026)** and **Fazeshift $17M Series A (May 2026)** ([techloy](https://www.techloy.com/best-ai-native-accounts-receivable-software-for-2026/)).
  - "Invoice processing + payment reminders" is a top-3 SMB n8n workflow.
- **Why incumbents miss small customers:** Monk, Fazeshift, Stuut, HighRadius and Billtrust sell to mid-market and enterprise AR teams. QuickBooks/Xero reminders are static templates that cannot read replies or handle partial payment, disputes or promise-to-pay.
- **What the agent does:**
  1. A cron job pulls open invoices from QBO/Xero.
  2. Score each customer's risk from days overdue, payment history and amount.
  3. Pick the next touch on a tone ladder of 1-4.
  4. Draft a personalized email that includes the invoice link.
  5. **Approval queue** (tone 1 can be auto-sent).
  6. Send from the owner's Gmail.
  7. Classify inbound replies: paid, promise-to-pay with a date, dispute, wrong contact, or out of office.
  8. Write a note on the invoice and pause or reschedule the cadence.
  9. Escalate disputes with a summary.
  10. Dashboard shows **$ recovered, DSO trend and promise-to-pay kept rate**.
- **Build:**
  - Tables: `orgs`, `customers`, `invoices`, `touches`, `replies`, `agent_events`.
  - Gmail push (Pub/Sub) or a 5-minute pg_cron poll; QBO webhooks for payment events.
  - Gemini for reply classification with JSON schema; Groq for drafts.
- **Defensible / impressive:** a real accounting integration, plus reply understanding (the agentic part), plus a "$ collected after agent touch" attribution metric. That outcome number is legible to any recruiter.
- **Scores:** Demand **5** · Buildable in 2-3 days **4** · Differentiation **4** · Demo wow **4**

### 2. Estimate / quote follow-up agent for trades and home services

- **Workflow:** every sent estimate gets a timed, job-specific follow-up. The agent answers simple objections, reschedules site visits, and flags hot leads to the owner.
- **Who pays:** HVAC, roofing, plumbing, landscaping, remodelers, cleaning companies (1-30 staff).
- **Evidence:**
  - **43% of sent estimates get zero follow-up**, the 48-hour window decides most jobs, and this costs $50K-$200K a year per business (vendor blog) ([Enterprise DNA](https://enterprisedna.co/resources/blog/trades-ai-estimate-follow-up)).
  - The first responder wins the job 78% of the time.
  - QuoteIQ and QuoteDrop exist but focus on creating estimates and pipeline boards ([Capterra QuoteDrop](https://www.capterra.com/p/10046036/QuoteDrop/)).
  - "Vertical SaaS for boring industries (HVAC, pest control, roofing)" is listed among the lowest-saturation categories ([preuve.ai](https://preuve.ai/blog/startup-ideas-2026)).
- **Why incumbents miss small customers:** ServiceTitan is priced for larger shops. Jobber and Housecall Pro send template reminders, not reply-aware follow-ups. Owners are on job sites and cannot do follow-up themselves.
- **What the agent does:**
  1. Ingest an estimate (Jobber/Housecall Pro webhook, a forwarded PDF email, or a manual upload).
  2. Extract the scope, price and customer.
  3. Schedule touches at day 0, 2, 5 and 10 by email/SMS.
  4. Classify replies: price objection, timing, wants changes, accept, or ghost.
  5. Draft a response; for a price objection, offer pre-approved options such as a financing link or a phased scope.
  6. Owner approves from a mobile view.
  7. Mark the job won or lost with a reason; the dashboard shows close rate before vs after.
- **Build:**
  - Gemini vision extracts line items from the estimate PDF.
  - pg_cron for cadences; email-only to stay free, with an optional Twilio trial for SMS.
  - Next.js mobile-first approval page.
- **Defensible / impressive:** owner-defined "concession policy" guardrails, plus win/loss reason analytics.
- **Scores:** Demand **4** · Buildable **5** · Differentiation **4** · Demo wow **4**

### 3. Speed-to-lead: inbound qualification and first reply (with scheduling negotiation)

- **Workflow:** a web form, email or Facebook lead comes in. The agent researches and qualifies it, sends a personalized first reply in under 2 minutes with real calendar slots, negotiates times by email, and routes junk away.
- **Who pays:** agencies, B2B services, clinics, law firms, real-estate teams.
- **Evidence:**
  - **Small businesses average about 47.5 hours to respond to a lead**; 63.5% of companies never respond; only 4.7% reply within 5 minutes; a 5-minute reply is 21x more likely to qualify than a 30-minute one ([RevenueHero 2026](https://www.revenuehero.io/blog/what-is-speed-to-lead-in-2026-benchmarks-data-and-real-expectations); [prospeo](https://prospeo.io/s/speed-to-lead)).
  - Lead generation is a top Upwork AI-automation posting type (275 in May 2026) ([Upwatcher](https://www.upwatcher.io/market/ai-automation/)).
  - "Lead qualification from inbound forms" is a top-3 SMB n8n workflow.
  - Scheduling-by-email agents are being funded: Howie ($6M, Sequoia/a16z) and Blockit ($5M seed from Sequoia, Jan 2026) ([usecarly](https://www.usecarly.com/blog/blockit-vs-howie/)).
- **Why incumbents miss small customers:** Chili Piper, Default and Qualified are mid-market and enterprise, priced per seat with Salesforce assumptions. HubSpot's agent features sit in higher tiers.
- **What the agent does:**
  1. Webhook receives the lead.
  2. Enrich it from the company website (fetch and summarize the homepage) and dedupe against the CRM.
  3. Score it against an ideal-customer rubric the owner writes in plain English.
  4. Draft a reply that cites the prospect's context and offers 3 slots from Google Calendar free/busy.
  5. Auto-send if the score is high and confidence is high, otherwise queue it.
  6. Handle "none of those work" back-and-forth by email until a time is booked.
  7. Push to the HubSpot free CRM.
  8. Weekly report: median response time, qualified rate, meetings booked.
- **Build:** Next.js form endpoint plus a webhook; Groq for sub-second scoring and drafting; Gemini for page summarization; Google Calendar API; HubSpot free API.
- **Defensible / impressive:** a live demo where you submit a form and a personalized reply with real slots lands within 60 seconds. Inbound-only, so it avoids the outbound-spam stigma.
- **Scores:** Demand **5** · Buildable **5** · Differentiation **3** · Demo wow **5**

### 4. Bill / receipt capture to bookkeeping with an exceptions queue (AP document agent)

- **Workflow:** supplier invoices and receipts arrive by email or upload. The agent extracts header and line items, matches them to a vendor and GL account, detects duplicates and anomalies (such as a price jump vs the last invoice), and posts a draft bill to QBO/Xero.
- **Who pays:** SMBs and, especially, **small bookkeeping firms** managing many clients.
- **Evidence:**
  - **68% of companies still key invoice data manually** into ERP/accounting systems ([HighRadius](https://www.highradius.com/finsider/ap-automation-2025-stats-for-cfos/)).
  - **Data entry/extraction is the #1 agent use case (47%)** ([Zapier 2026](https://zapier.com/blog/ai-agents-survey/)).
  - Upwork still carries PDF-to-spreadsheet data-entry gigs ([Upwork data entry 2026](https://www.upwork.com/resources/data-entry-skills)).
  - Category validation: **Basis raised $100M at $1.15B (2026-02-24)** for accounting-firm agents ([CPA Practice Advisor](https://www.cpapracticeadvisor.com/2026/02/24/basis-raises-100-million-to-deploy-ai-agents-for-accounting-firms/178759/)); Balance and Last Accounting Company target SMB books ([YC finance & accounting](https://www.ycombinator.com/companies/industry/finance-and-accounting)).
- **Why incumbents miss small customers:** Basis serves top-25 firms. Dext, Hubdoc and Bill.com stop at OCR extraction; they don't reason about anomalies or explain why a bill is flagged. Bookkeepers still review everything by hand.
- **What the agent does:**
  1. Watch an inbox alias or upload folder.
  2. Classify the document type.
  3. Extract to a schema with Gemini PDF/vision.
  4. Validate: totals add up, tax rate is plausible, vendor exists, and there is no duplicate by number, amount and date.
  5. Suggest a GL account from the vendor's history.
  6. Compare to the vendor's prior invoices to catch price creep.
  7. Put low-confidence fields in an **exceptions queue with highlighted source regions**.
  8. Post a draft bill via the QBO API.
  9. Show an accuracy and time-saved dashboard.
- **Build:** Supabase Storage for documents; an Edge Function per document; JSON-schema extraction; side-by-side PDF and field review UI.
- **Defensible / impressive:** field-level confidence with click-to-source highlighting, plus price-creep detection, shows document-AI depth rather than just "OCR".
- **Scores:** Demand **5** · Buildable **4** · Differentiation **3** · Demo wow **4**

### 5. Security questionnaire / vendor due-diligence responder for small B2B SaaS

- **Workflow:** an enterprise prospect sends a 200-row Excel (SIG, CAIQ or custom). The agent drafts answers from the company's policies and past answers, cites its sources, and flags unknowns for the founder or CTO.
- **Who pays:** seed to Series A SaaS companies, agencies, and MSPs selling to enterprises.
- **Evidence:**
  - 20-40 hours per comprehensive questionnaire, and **72% of SaaS vendors say security reviews delay deals by 2+ weeks** (vendor blogs) ([Wolfia, 2026-03](https://wolfia.com/blog/security-questionnaire-automation-complete-guide); [Procurize](https://blog.procurize.ai/how-security-questionnaires-are-slowing-down-deals)).
  - Security/compliance is the #1 SMB AI barrier (27%) ([Upwork](https://www.upwork.com/resources/state-of-ai-in-smbs)).
  - YC's 2026 RFS asks for vertical AI for compliance-heavy industries ([ycinsight](https://ycinsight.com/yc-request-for-startups)).
- **Why incumbents miss small customers:** Loopio, Responsive, Conveyor and Vanta's questionnaire automation are sold as annual contracts bundled with compliance platforms. Tiny SaaS teams answer by hand in Google Sheets.
- **What the agent does:**
  1. Upload policies and past questionnaires to build a pgvector knowledge base.
  2. Upload a new XLSX.
  3. Detect the question columns.
  4. Retrieve and draft each answer with citations and a confidence score.
  5. Turn "no evidence" items into founder tasks.
  6. Reviewer accepts or edits; edits are saved back to the answer library (learning loop).
  7. Export the filled XLSX in its original format.
- **Build:** pgvector, SheetJS for the XLSX round-trip, Gemini embeddings and Flash for drafting, and a review grid UI.
- **Defensible / impressive:** answers grounded in citations, plus an answer library that improves with each review. It also shows RAG done responsibly.
- **Scores:** Demand **4** · Buildable **4** · Differentiation **4** · Demo wow **4**

### 6. Certificate-of-insurance (COI) and vendor-compliance chasing agent

- **Workflow:** collect COIs from subcontractors and vendors, extract ACORD 25 fields, check them against contract requirements (limits, additional insured, waiver of subrogation), chase missing or expiring certificates, and keep a compliance roster.
- **Who pays:** small general contractors, property managers, event venues, franchise operators.
- **Evidence:**
  - AI agents for COI tracking are an established mid-market workflow ([Datagrid](https://datagrid.com/blog/ai-agents-automate-vendor-insurance-certificate-tracking)).
  - SMB options start around **$1,000/year** (SmartCompliance), and C2COI offers basic tracking only ([Vertikal 2026](https://www.vertikalrms.com/article/best-coi-tracking-software-2026-top-coi-platforms-for-contractors/); [getbcs 2026](https://www.getbcs.com/blog/top-certificate-of-insurance-tracking-companies)).
  - BCS RiskBot (2025) and illumend show incumbents are only now adding agents.
- **Why incumbents miss small customers:** enterprise pricing and onboarding. Small GCs track certificates in spreadsheets and discover lapses after a claim.
- **What the agent does:**
  1. Create a vendor roster with a requirement template per contract.
  2. Email the vendor's broker requesting a COI.
  3. Parse the inbound PDF with Gemini vision.
  4. Run a **deterministic rule engine**: compliant, deficient (with the specific gap), or expiring in 30 days.
  5. Auto-draft a deficiency email to the broker.
  6. Owner approves.
  7. Repeat the cycle on expiry.
  8. Status board in red, amber and green.
- **Build:** a rules table (not the LLM) makes compliance decisions; the LLM only extracts and drafts. That split is a good architecture story. pg_cron handles expiries.
- **Defensible / impressive:** "LLM extracts, rules decide", plus an audit trail, is exactly what compliance buyers want. Niche and non-obvious.
- **Scores:** Demand **4** · Buildable **5** · Differentiation **5** · Demo wow **3**

### 7. Shopify reorder / inventory-forecast agent (post-Stocky gap)

- **Workflow:** forecast SKU demand, compute reorder points from supplier lead times, draft purchase orders, email suppliers after approval, and track confirmations.
- **Who pays:** Shopify merchants doing roughly $20K-$2M a year in revenue.
- **Evidence:**
  - **Shopify shut down Stocky on 2026-08-31.** It was removed from the App Store on 2026-02-02 and its APIs stopped working at shutdown, leaving merchants without forecasting going into peak season ([Prediko](https://www.prediko.io/stocky-sunsetting); [Finaloop](https://www.finaloop.com/blog/stocky-discontinued-in-2026-what-shopify-merchants-should-do); [Starshipit](https://starshipit.com/blog-content/stocky-shutting-down)).
  - Stockouts cost 8-12% of annual revenue, and 37% of shoppers who hit a stockout buy elsewhere (vendor blog) ([tenten](https://tenten.co/shopify/shopify-demand-forecasting-ai-tools/)).
  - A new entrant (Forestock) appeared on Product Hunt targeting small stores ([hunted.space](https://www.hunted.space/product/forestock)).
- **Why incumbents miss small customers:** Prediko, Inventory Planner and Cogsy are priced for scaling brands. Shopify's native tools handle POs and transfers but have no forecasting.
- **What the agent does:**
  1. Sync orders and inventory from a Shopify dev store.
  2. Run a statistical forecast (moving average or Holt-Winters in TypeScript; the LLM never does the math).
  3. The LLM explains anomalies and seasonality in plain English and reads the promo calendar.
  4. Compute days-of-cover and the reorder date.
  5. Draft a PO and supplier email.
  6. Approve.
  7. Parse supplier replies (confirmed or delayed) and update the expected arrival date.
- **Build:** Shopify Admin GraphQL plus `orders/create` webhooks; a nightly pg_cron forecast job; Recharts.
- **Defensible / impressive:** a timely, dated market gap; the right split of work between the LLM and statistics; strong charts.
- **Scores:** Demand **4** · Buildable **4** · Differentiation **4** · Demo wow **4**

### 8. Tender / RFP finder and compliance-matrix agent for small contractors (SLED / non-US / non-federal)

- **Workflow:** daily scan of public tender feeds, score fit against the company profile, "shred" each RFP into a requirements and compliance matrix, and draft a go/no-go memo and section outlines.
- **Who pays:** 2-50 person IT services, construction, consultancy, and facilities/security contractors.
- **Evidence:**
  - **GovDash raised a $30M Series B (Jan 2026)**, and its customers won more than $5B in 2025 ([sweetspot](https://www.sweetspot.so/blog/govcon-ai-tools-small-business-federal-contractors/); [deeprfp](https://deeprfp.com/blog/best-rfp-tools-comparison/)).
  - A small-business AI contracting toolkit runs under $200/month, and AI cuts drafting time 30-40% ([jorpex](https://jorpex.com/guides/ai-changing-government-contracting/)).
- **Why incumbents miss small customers:** GovDash, GovSignals and Procurement Sciences focus on federal mid-tier contractors. State, local and education feeds and non-US portals (UK Find a Tender, EU TED, CanadaBuys) are fragmented, so small firms find tenders too late.
- **What the agent does:**
  1. A cron job pulls feeds (SAM.gov, TED and UK Find a Tender APIs are all free).
  2. Embed each tender and compare it to the company capability statement.
  3. Notify on the top matches.
  4. On click, parse the RFP PDF into a matrix: requirement, section reference, shall/must flags, due dates, evaluation criteria.
  5. Draft a go/no-go memo with risk flags.
  6. Draft section outlines with past-performance snippets.
  7. Track deadlines.
- **Build:** public APIs plus pgvector; Gemini long-context for 100-page RFPs; a matrix grid with XLSX/DOCX export.
- **Defensible / impressive:** the compliance matrix is a concrete, checkable artifact, which is more convincing than "AI wrote my proposal".
- **Scores:** Demand **4** · Buildable **3** · Differentiation **4** · Demo wow **4**

### 9. Freight email-to-load / quote agent for small brokerages

- **Workflow:** read the shared inbox and classify each email (quote request, capacity offer, check call, rate confirmation). Extract origin, destination, equipment, dates and weight. Price the quote from a lane-history rate table and reply.
- **Who pays:** freight brokerages and dispatch services with 2-20 staff.
- **Evidence:** mid-size brokerages automate more than 80% of inbound carrier email and cut quote response from about 47 minutes to under 5 ([gettransport 2026](https://blog.gettransport.com/trends-in-logistic/ai-agents-freight-brokers-2026-quote-automation/); [FreightWaves / Teknowlogi](https://www.freightwaves.com/news/teknowlogi-uses-ai-to-automate-email-quote-requests); [levity](https://levity.ai/en/blog/ai-in-freight)).
- **Why incumbents miss small customers:** Drumkit, Pallet and Parade sell to mid-size brokerages with TMS integrations. Small brokers live in Outlook and spreadsheets.
- **What the agent does:**
  1. Watch the Gmail inbox.
  2. Classify the email.
  3. Extract fields to JSON.
  4. Ask a clarifying question if a field is missing.
  5. Look up the lane rate (table plus a margin rule).
  6. Draft the quote reply.
  7. Approve, or auto-send under a dollar threshold.
  8. Log to a loads board; track win rate per lane.
- **Build:** Gmail API; Groq for high-volume classification; Gemini for extraction; a Supabase loads table with a Realtime board.
- **Defensible / impressive:** domain vocabulary (MC numbers, reefer, LTL) makes it feel expert-built. A clear "inbox becomes structured operations" story.
- **Scores:** Demand **4** · Buildable **4** · Differentiation **4** · Demo wow **3**

### 10. Supplier RFQ / procurement agent (multi-supplier quote collection and comparison)

- **Workflow:** an owner describes a need ("500 branded mugs by Nov 15"). The agent emails RFQs to 3-8 suppliers, parses their replies (price, MOQ, lead time, terms), chases non-responders, normalizes the quotes into a comparison table, and drafts a counter-offer.
- **Who pays:** restaurants, small manufacturers, construction subcontractors, event companies, office managers.
- **Evidence:**
  - Forrester expects **about 1 in 5 B2B sellers to face agent-led quote negotiations by the end of 2026** ([elogic](https://elogic.co/blog/ai-agents-b2b-buying/)).
  - Hostinger now markets a "procurement AI agent" for small businesses without a purchasing department ([Hostinger](https://www.hostinger.com/procurement-ai-agent)). That validates demand, but it is a chat helper that does not run the email loop.
  - a16z Big Ideas 2026 calls for "multiplayer" vertical AI that coordinates external parties ([vccafe](https://www.vccafe.com/vertical-ai-in-2026-the-good-the-bad-and-the-ugly/)).
- **Why incumbents miss small customers:** Zip, Coupa and Fairmarkit are enterprise source-to-pay tools. SMBs email suppliers one by one.
- **What the agent does:**
  1. Turn the brief into a structured spec.
  2. Pick suppliers from a list.
  3. Send personalized RFQs, each with a reply-to tracking alias.
  4. Parse replies, including attachments.
  5. Ask follow-up questions if terms are missing.
  6. Send a reminder at 48 hours.
  7. Build a normalized comparison (landed cost, lead time, risk).
  8. Draft a negotiation email ("Supplier B quoted X; can you match?").
  9. Owner awards the order.
  10. Draft the PO.
- **Build:** inbound email webhooks (Postmark or Resend), threading by alias, a comparison grid, and a negotiation policy config.
- **Defensible / impressive:** a true multi-party agent with an external feedback loop. The demo of "3 suppliers reply, then the comparison table builds itself" is striking.
- **Scores:** Demand **3** · Buildable **4** · Differentiation **5** · Demo wow **5**

### 11. Independent insurance agency renewal-retention agent

- **Workflow:** track policy expirations. At 60/45/30 days out, contact the client, collect updated info (vehicles, payroll, square footage) through a smart form, chase missing documents, and prep a remarketing packet for the producer.
- **Who pays:** solo and small independent P&C agencies, also benefits brokers.
- **Evidence:**
  - AI adoption is about **47% at solo and two-producer shops vs 64% overall**, and 51% for independents vs 73% for captives.
  - **25-30% of lapsed renewals happen because the client was not contacted proactively.**
  - Agents spend about 40% of their week on non-revenue tasks.
  - Sources: industry and vendor blogs ([dev.to scalelogix 2026](https://dev.to/scalelogix_ai/ai-for-insurance-agents-and-brokers-whats-actually-working-in-2026-4fg0); [getperspective.ai](https://getperspective.ai/blog/ai-for-insurance-agencies-in-2026-from-lead-capture-to-renewals/markdown)).
- **Why incumbents miss small customers:** Applied Epic and Vertafore have AI add-ons but are heavy and expensive. AI vendors target carriers and large brokers.
- **What the agent does:**
  1. Import the book of business from a CSV or AMS export.
  2. Schedule touches by expiration date.
  3. Send a personalized check-in with a secure update form.
  4. Parse the client's answers and uploaded declarations pages.
  5. Detect exposure changes and flag cross-sell opportunities (umbrella, cyber).
  6. Build a renewal summary for the producer.
  7. Show retention-rate and premium-at-risk dashboards.
- **Build:** CSV import, pg_cron, Gemini for dec-page extraction, and a client-facing magic-link form (Supabase Auth OTP).
- **Defensible / impressive:** "premium at risk / premium saved" as the headline metric. Compliance-aware: the agent never gives coverage advice and always routes it to a licensed agent.
- **Scores:** Demand **3** · Buildable **4** · Differentiation **4** · Demo wow **3**

### 12. Review-response agent with an operations-insight loop (local businesses)

- **Workflow:** pull new Google/Yelp reviews and draft on-brand replies, escalating negative ones. The differentiator: cluster complaints into operational issues ("cold food on Fridays", "rude front desk") and send a weekly digest.
- **Who pays:** restaurants, clinics, salons, auto shops, multi-location franchisees.
- **Evidence:**
  - **75% of SMBs don't respond to a single Google review.** 89% of consumers expect a response, and same-day expectations rose from 6% to 19% (vendor blogs) ([replient](https://replient.ai/en/blog/responding-to-google-reviews-is-important); [Vendasta 2026](https://www.vendasta.com/blog/ai-review-response/); [beside](https://www.beside.com/blog/how-to-automate-google-review-replies-with-ai)).
  - **Caveat:** reply drafting itself is getting crowded (Vendasta, Birdeye, Podium and many small tools). Differentiate with ops insights and multi-location rollups.
- **Why incumbents miss small customers:** Birdeye and Podium cost hundreds per month per location. A single restaurant won't pay that.
- **What the agent does:**
  1. Fetch reviews. The Google Business Profile API requires an access application, so use CSV or demo import for a portfolio build.
  2. Run sentiment and topic extraction.
  3. Draft a reply per brand-voice rules.
  4. Auto-post 4-5 star replies; queue 1-3 star replies for the owner with a suggested make-good.
  5. Produce a weekly "top 3 fixable issues" report with trend lines.
- **Build:** Groq for drafts, Gemini for topic clustering, a Recharts trend dashboard.
- **Scores:** Demand **4** · Buildable **5** · Differentiation **2** · Demo wow **3**

### Scorecard (sorted by total)

| # | Opportunity | Demand | Buildable 2-3d | Differentiation | Demo wow | Total |
|---|---|---|---|---|---|---|
| 3 | Speed-to-lead inbound + scheduling | 5 | 5 | 3 | 5 | **18** |
| 1 | Overdue-invoice chasing (AR) | 5 | 4 | 4 | 4 | **17** |
| 2 | Trades quote follow-up | 4 | 5 | 4 | 4 | **17** |
| 6 | COI compliance chasing | 4 | 5 | 5 | 3 | **17** |
| 10 | Supplier RFQ / procurement | 3 | 4 | 5 | 5 | **17** |
| 4 | AP bill capture + exceptions | 5 | 4 | 3 | 4 | **16** |
| 5 | Security questionnaire responder | 4 | 4 | 4 | 4 | **16** |
| 7 | Shopify reorder (post-Stocky) | 4 | 4 | 4 | 4 | **16** |
| 8 | Tender finder + compliance matrix | 4 | 3 | 4 | 4 | **15** |
| 9 | Freight email-to-quote | 4 | 4 | 4 | 3 | **15** |
| 11 | Insurance renewal retention | 3 | 4 | 4 | 3 | **14** |
| 12 | Review response + ops insights | 4 | 5 | 2 | 3 | **14** |

**Recommendation:**

- **For a portfolio piece that reads as real SaaS:** pick **#1 (AR chasing)** or **#3 (speed-to-lead)**. Both have the strongest demand data and a clean dollar or time metric.
- **For the most memorable demo:** pick **#10 (supplier RFQ multi-party agent)**.
- **For the least crowded niche with a strong architecture story:** pick **#6 (COI, where the LLM extracts and rules decide)**.
- **A strong combined product:** a "cash-flow agent for small service businesses" combining #2 and #1. Follow up the quote until it is won, then invoice and chase until paid. One owner, one dashboard, two money metrics.

**Not included, with reasons:**

- **Meeting-to-CRM:** Granola, Fireflies and Fathom already do it.
- **Email scheduling negotiation as a standalone product:** Howie and Blockit are funded. It is folded into #3 instead.
- **AI recruiting screening:** legal risk.

---

## C. Five product/UX patterns that make an AI product feel like real SaaS, not a wrapper

1. **Human-in-the-loop approval queue with confidence-based autonomy.**
   - Every agent action lands as a card in an inbox showing the proposed action, rationale, confidence, source evidence, and a diff vs the default.
   - Approve, edit or reject, with bulk approve.
   - Per-action autonomy levels (for example, "auto-send tone-1 reminders; queue everything else"), and autonomy is earned as the approval rate rises.
   - Matches the 2026 consensus that HITL is the standard and that "fully autonomous" pitches draw skepticism ([dev.to 2026](https://dev.to/auraveni/ai-agents-for-business-whats-actually-working-in-2026-l8)), and YC W26's "customer supervises or approves the output" framing.
2. **Immutable audit trail and explainability.**
   - An append-only `agent_events` table: actor, input snapshot, model and prompt version, tool calls, output, and approving human.
   - A per-record timeline (for example: "Invoice #1042: reminder 2 drafted, approved by Sara, sent, reply classified as promise-to-pay for Oct 15").
   - Addresses the #1 SMB barrier (security/compliance, 27%) and the demand for governed, auditable systems documented on HN.
3. **Real integrations with idempotent, event-driven plumbing.**
   - OAuth into the systems where the work lives (Gmail, QBO/Xero, Shopify, HubSpot), not copy-paste.
   - Webhooks plus scheduled sync, idempotency keys, retry with backoff, a dead-letter view, and an "integration health" page.
   - Upwork buyers explicitly want automation "wrapped" with a real front end and a fresh data feed ([Upwatcher](https://www.upwatcher.io/market/ai-automation/)).
4. **Outcome dashboard in business units, not AI units.**
   - Show dollars collected, DSO, quote win rate, hours saved, response time and premium retained, against a baseline captured at onboarding.
   - Attribute each outcome to agent actions.
   - ROI uncertainty is the #2 SMB barrier (24%), so the dashboard is the sales pitch ([Upwork](https://www.upwork.com/resources/state-of-ai-in-smbs)).
5. **Customer-owned policy and guardrail configuration, with a shadow mode.**
   - Plain-English rules compiled into structured policy: tone ladder, never-contact list, maximum discount, send windows, escalation triggers, spend thresholds.
   - Deterministic checks run before any send; the LLM proposes and the rules decide.
   - A dry-run / shadow mode for week 1 ("here is what I would have sent") builds trust before go-live.

**Bonus patterns:**
- Multi-tenant orgs with roles (owner, reviewer, viewer) via Supabase RLS.
- An undo or recall window on sends.
- An exceptions inbox for documents the agent could not parse.
- Onboarding that imports real data in under 5 minutes.
- Per-tenant prompt and model versioning, with an eval set built from real past cases.
- A per-org usage and cost meter.

---

## Source index (key sources)

- Extruct YC W26 breakdown (2026-03-25): https://www.extruct.ai/research/ycw26/
- anysite.io Product Hunt 2026 data: https://anysite.io/blog/who-actually-launched-on-product-hunt-in-2026/
- TechCrunch / RevenueCat AI app retention (2026-03-10): https://techcrunch.com/2026/03/10/ai-powered-apps-struggle-with-long-term-retention-new-report-shows
- Upwork State of AI in SMBs 2026: https://www.upwork.com/resources/state-of-ai-in-smbs
- Upwork In-Demand Skills 2026: https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work
- Upwatcher AI-automation freelance market (May 2026): https://www.upwatcher.io/market/ai-automation/
- Zapier State of agentic AI adoption 2026: https://zapier.com/blog/ai-agents-survey/
- Gartner, 40%+ of agentic projects scrapped by 2027: https://www.outlookbusiness.com/artificial-intelligence/over-40-of-agentic-ai-projects-will-be-scrapped-by-2027-says-gartner
- QuickBooks Small Business Late Payments Report 2026: https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/
- Basis $100M (2026-02-24): https://www.cpapracticeadvisor.com/2026/02/24/basis-raises-100-million-to-deploy-ai-agents-for-accounting-firms/178759/
- EliseAI $350M (2026-09-29): https://siliconangle.com/2026/09/29/eliseai-raises-350m-to-enhance-its-ai-work-automation-suite/
- AI SDR post-mortem: https://deathtocoldemails.com/ai-sdr-post-mortem/
- Stocky shutdown: https://www.prediko.io/stocky-sunsetting
- Speed-to-lead benchmarks 2026: https://www.revenuehero.io/blog/what-is-speed-to-lead-in-2026-benchmarks-data-and-real-expectations
- Vertical AI 2026 (Bessemer / a16z summaries): https://www.vccafe.com/vertical-ai-in-2026-the-good-the-bad-and-the-ugly/
- Free tiers: Gemini https://tinkerllm.com/blog/gemini-api-free-tier-limits-rate-quotas/ ; Groq https://eesel.ai/blog/groq-pricing

**Caveats and gaps:**
- Several pain statistics (trades follow-up, review response, insurance lapses, questionnaire hours, missed calls) come from vendor blogs and are directional only.
- Free-tier LLM quotas changed several times in 2026. Verify in AI Studio and the Groq console before building.
- Not directly sampled: r/n8n and r/automation threads (searches returned blog aggregations of popular workflows, not the threads themselves), Fiverr gig counts, and McKinsey or Gartner SMB-specific 2026 surveys.
