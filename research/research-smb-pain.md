# SMB operational pain points a small Next.js + Supabase + LLM app could solve

Research date: 2026-10-03. Target price band: $10-50/month.

## Method and honesty notes (read first)

- **Reddit, Indie Hackers and old.reddit were NOT reachable.** The search tool rejected reddit.com as a domain and WebFetch blocked reddit.com. So there are no first-hand Reddit quotes below. Reddit-sourced items that appear are second-hand, quoted inside third-party articles, and are labelled as such.
- First-hand voice instead comes from Trustpilot, Capterra, comparison pages, the Amazon Seller Central forum, tradespeople quoted in press, and HN (Algolia API worked but 2025-26 SMB-owner content there is thin).
- Many statistics come from vendor blogs (they sell the fix, so they inflate). Each is tagged **[primary survey]**, **[press]**, **[vendor claim]** or **[anecdote]**. Treat vendor claims as directional only.
- Quotes are kept short on purpose. Where a stat came only from a search-result summary (the page itself was not fetched or the fetch failed), I say "search summary".
- Scores are 1-5. **Sev**erity, **Freq**uency, **Build**ability (5 = easily done in 2-3 days by one engineer): higher is better for you. **Crowd**ing: 5 = very crowded (bad), 1 = open field.

---

## Scorecard

| # | Pain point | Sev | Freq | Build | Crowd | Verdict |
|---|---|---|---|---|---|---|
| 1 | Chasing late invoices (AR follow-up that reads replies) | 5 | 5 | 4 | 4 | Strong demand, crowded; wedge = flat $15-25 price + reply parsing |
| 2 | Wholesale/B2B orders arriving as emailed PDFs/Excel/text, retyped | 4 | 5 | 3 | 2 | Best "open field" candidate; incumbents are enterprise-priced |
| 3 | Chargeback/dispute evidence packets for small online sellers | 4 | 4 | 4 | 3 | Incumbent hated for 25%+ fees; flat-fee wedge |
| 4 | Trades: quotes take 2-4 hrs, go out late, never followed up | 4 | 5 | 4 | 4 | Real pain; many "AI quote" entrants; follow-up is the gap |
| 5 | Subcontractor/vendor certificate-of-insurance (COI) tracking | 4 | 3 | 4 | 3 | Document-parsing fit; small-tier gap |
| 6 | ADA/accessibility demand-letter exposure for small e-commerce | 5 | 2 | 3 | 4 | High severity, low frequency per customer |
| 7 | Restaurant supplier invoice capture -> item price/cost alerts | 4 | 5 | 3 | 4 | Real, but MarginEdge etc. entrenched |
| 8 | Contracts/leases signed without understanding (+ renewal tracker) | 4 | 3 | 5 | 4 | Easy to build, liability + trust issue |
| 9 | State employment-law/HR compliance for 1-20 employee firms | 4 | 4 | 3 | 4 | Confidence collapsing; hallucination risk |
| 10 | Missed calls / slow first response for home-service leads | 5 | 5 | 2 | 5 | Huge pain, hardest to differentiate; telephony needed |
| 11 | Overpriced reputation tools (Podium/Birdeye) -> cheap review replies | 3 | 5 | 5 | 5 | Pain is price, not capability; commodity |
| 12 | Gov/RFP bid discovery and fit-scoring for small contractors | 3 | 3 | 3 | 4 | Thin evidence; niche |
| 13 | Small Shopify stores priced out of helpdesks (Gorgias) | 3 | 4 | 4 | 5 | Borderline "generic chatbot"; crowded |
| 14 | SaaS subscription creep audit | 2 | 4 | 3 | 4 | Low urgency; needs card/bank data or email parsing |

**My ranking if building one app in 2-3 days:** #2, then #3, then #1, then #5. Reasoning is at the end.

---

## 1. Chasing late invoices

**Problem / who:** Service and project businesses (contractors, agencies, B2B services, 1-25 staff) invoice and then personally nag customers by email/text; payment arrives late almost every time.

**Evidence**
- 29% of 1,052 US small-business owners "delayed paying themselves" because customers paid late; 17% missed or nearly missed payroll; 28% have $5,000+ tied up. Bluevine/Centiment survey, fielded Feb 2-5, 2026 **[primary survey, lender-sponsored]**. https://www.bluevine.com/blog/small-business-late-payment-gaps (search summary; the press-release URL 404'd on direct fetch)
- 39% of owners said a single late payment threatened payroll or bills in the past year. Intuit QuickBooks 2026 Business Owner Report **[primary survey]**. https://quickbooks.intuit.com/r/small-business-data/business-ownership-in-2026/
- 92% of businesses are typically paid after the due date; 76% spend 3+ hours/week on receivables, 40% spend 6+; 100% follow-up coverage makes payment within a week 76% likelier; adding SMS to email lifts two-week payment 49% (relative). Chaser 2026 AR report **[vendor claim]**. https://www.chaserhq.com/the-2026-accounts-receivable-report

**Workarounds / incumbents:** QuickBooks/Xero built-in reminders (fixed schedule), Chaser, Upflow, Bill.com, spreadsheets plus personal texts. Dislikes: reminders are generic, don't read replies ("I'll pay Friday"), mid-market AR tools are priced for finance teams, awkward tone for relationship customers.

**Why LLM:** (a) classify inbound replies (promise-to-pay date, dispute, "resend the PDF") and update status; (b) tone-calibrated escalation per customer relationship; (c) draft the right-channel message. Not practical with templates.

**WTP signals:** QuickBooks users already pay $38-140+/month for software whose reminders they don't trust. A $15-30 owner-operator tier is plausible but unproven.

**Scores:** Sev 5 / Freq 5 / Build 4 (Stripe/QuickBooks/CSV or Gmail OAuth ingestion is the hard part) / Crowd 4.

---

## 2. Orders arrive as emailed PDFs, Excel and text, then get retyped

**Problem / who:** Small wholesalers, food/beverage distributors, parts suppliers, print shops, 5-50 staff. Customers email POs in every format; someone retypes them into QuickBooks/Shopify/an ERP. Errors cause wrong shipments.

**Evidence**
- AI order-entry products "read customer orders in various formats including emailed PDFs and spreadsheets"; vendors claim 70-90% time reductions. StackCube, Usebuddy, Centerprism guides, 2026 **[vendor claim]**. https://blog.stackcube.io/ai-order-entry-software-for-distributors
- 55% of North American wholesale distributors have invested in core systems but not integrated them; 93% are exploring AI, only 23% at scaling stage. Distribution Strategy Group 2026 research via NAW (search summary) **[analyst]**. https://www.naw.org/ai-in-distribution/
- Workaround evidence: CSV importers like SaasAnt exist because POs often carry "80-100 line items" typed by hand. https://www.saasant.com/blog/process-to-import-purchase-orders-into-quickbooks-online/ **[vendor claim]**

**Weakness of the evidence:** No owner-voice quotes found. This is the thinnest on first-hand voice but the cleanest on market structure.

**Workarounds / incumbents:** Manual retyping; EDI (costly, customers won't adopt); AI order-entry vendors (Ella, Buddy, StackCube) sold via demos, not self-serve at $20-50/month.

**Why LLM:** Extraction from unstructured, inconsistent documents plus fuzzy matching of customer part names to your SKU list is what vision/LLM models now do cheaply. Pre-LLM this needed per-customer templates.

**WTP signals:** Time saved is easy to price (hours x wage). Enterprise vendors exist so budget exists; the self-serve small tier looks unserved. Unvalidated.

**Scores:** Sev 4 / Freq 5 (daily for affected firms) / Build 3 (extraction is easy, write-back to QuickBooks/Shopify is the effort; MVP = review screen + CSV/draft-order export) / Crowd 2.

---

## 3. Chargeback evidence packets for small online sellers

**Problem / who:** Shopify/Stripe merchants with $5k-$500k/month revenue. A dispute needs a bank-readable evidence packet inside a 7-21 day window; assembling it takes about an hour, so merchants skip it or submit generic proof.

**Evidence**
- "Manual representment wins roughly 12% of the time" and a packet takes "the better part of an hour." Chargeflow blog (**vendor with an interest**), 2026. https://www.chargeflow.io/blog/shopify-chargebacks-guide (search summary)
- Incumbent complaints on Trustpilot: "the winrate was absolutely tragic" (1 star, May 21, 2026); "their 50% fee which on high ticket items adds up to hundreds of dollars charged per order" (1 star, May 1, 2026); "Chargeflow promises full automation, but what you actually get is half baked" (2 stars, Jul 12, 2025). https://www.trustpilot.com/review/chargeflow.io
- Chargeflow takes 25% of recovered amounts with no cap (search summary). A critical article (Apr 19, 2026) collects merchant allegations incl. a 4-day response on a 5-day window, quoting Trustpilot and Reddit posters second-hand. https://dropshippingit.com/is-chargeflow-a-scam/ (**partisan source**).

**Workarounds / incumbents:** Shopify's built-in dispute form, Chargeflow, Disputifier, Justt, manual PDFs. Dislikes: percentage-of-recovery fees (grow with order value), false "alerts" that cost money, opaque automation, billing after cancellation.

**Why LLM:** Map the reason code to the argument, assemble tracking/AVS/IP/order/policy/communications evidence, write the narrative that fits the reason code. Pre-LLM this was rules plus templates.

**WTP signals:** Merchants already tolerate 25% of recovered dollars. A flat $19-49/month with transparent win-rate reporting directly attacks the top complaint. Caveat: Stripe/Shopify keep adding native automated dispute tooling; check current features before building.

**Scores:** Sev 4 / Freq 4 / Build 4 (Stripe disputes API + evidence submission is well documented; start Stripe-only) / Crowd 3.

---

## 4. Trades: quotes take 2-4 hours, go out late, never get followed up

**Problem / who:** Electricians, builders, landscapers, HVAC, 1-15 staff. Estimating happens in evenings after site work.

**Evidence**
- "By the time everything was pulled together, three or four hours had disappeared"; "Every delay reduces your chances of winning the job." Pro Builders Network substack, Mar 19, 2026 **[press, anecdote]**. https://probuildersnetwork.substack.com/p/the-quote-came-too-late
- Builder: "Even preparing a quote for a deck can take around two hours"; an electrical firm was "losing upward of ... 60 hours a week" across quoting-related work. SmartCompany, Oct 1, 2026, citing the Association of Professional Builders 2026 report (58.6% of 8,462 residential builders charge for quotes) **[press]**. https://smartcompany.com.au/construction-engineering/death-of-the-free-quote-why-tradies-are-charging-customers-upfront
- Capterra, Housecall Pro reviewer: "The cost is high and all reviews say that support is not helpful after signing up." (Mar 2025, 4 stars). Search summary: Housecall Pro lacks "advanced estimating, change order workflows." https://www.capterra.com/p/140363/HouseCall-Pro/reviews/
- HN, May 24, 2025: Show HN "ToolsAi" generates job quotes from plain text for electricians/plumbers (https://news.ycombinator.com/item?id=44082157); HN comment Nov 23, 2025 says contractors "waste 2+ hours per estimate" (https://news.ycombinator.com/item?id=46027246). Confirms the pain, also shows the idea is already being built.
- Automated estimate follow-up converts 20% more than manual (ServiceTitan 2024 Pulse via search summary) **[vendor]**.

**Workarounds / incumbents:** Jobber, Housecall Pro, ServiceTitan (add-on cost creep), Estimation Pro AI (from $29/month per Capterra listing), Excel templates, Word docs.

**Why LLM:** Turn a voice note/photo/plain-text scope into a line-itemed, branded quote; maintain a price book; draft follow-ups. The follow-up engine (day 2/5/10 nudges that read replies) is where I see least coverage.

**WTP signals:** Estimation Pro AI is already $29/month; contractors pay $100+/month for Jobber-class tools; builders charge $250-1,000 per quote, showing how much a quote is worth to them.

**Scores:** Sev 4 / Freq 5 / Build 4 / Crowd 4.

---

## 5. Subcontractor / vendor certificate-of-insurance (COI) tracking

**Problem / who:** Small GCs, property managers, event organisers, franchise operators with 10-200 vendors. COIs expire silently; claims get denied.

**Evidence**
- "7 out of 10 collected COIs are noncompliant in some way" and compliance takes about three follow-ups (Jones Insurance, quoted by Expiration Reminder) **[vendor claim]**. https://www.expirationreminder.com/blog/how-expired-cois-put-your-company-at-financial-risk
- "Fewer than half have a system that tells them when that certificate expires" (search summary of Jones). A property manager's claim was denied when the contractor's COI had expired eight months earlier **[anecdote]**. https://getjones.com/blog/how-to-manage-subcontractor-certificates-of-insurance-cois/
- Spreadsheets "cannot send alerts ... or escalate" unanswered renewal requests (Expiration Reminder).

**Workarounds / incumbents:** Spreadsheets and calendar reminders; myCOI, Jones, Billy, TrackMyVendor, Vertikal RMS (targeted at mid-size/large portfolios).

**Why LLM:** Reading ACORD 25 PDFs and endorsements (limits, additional insured, policy dates, cancellation clause) is a vision/extraction task; pre-LLM needed brittle OCR templates. Auto-chase vendors by email until compliant.

**WTP signals:** A single uninsured claim "commonly reaches six figures," so $30/month is trivially justified. I found no owner complaints about incumbent prices; this is a risk-cost sale.

**Scores:** Sev 4 / Freq 3 / Build 4 / Crowd 3.

---

## 6. ADA / accessibility demand letters hitting small e-commerce

**Problem / who:** Small online retailers and local-service sites receiving a law-firm demand letter or suit.

**Evidence**
- 4,928 web accessibility suits in 2025 (5,000+ per other trackers); about 70% target e-commerce, 64% of sued companies had under $25M revenue; 432 new suits in Aug 2026 **[vendor trackers]**. https://www.equalweb.com/blog/ada-web-accessibility-lawsuits-2026/ and https://abc17news.com/stacker-money/2026/01/14/accessibility-lawsuits-rose-by-37-in-2025-why-small-businesses-can-no-longer-ignore-their-websites/
- Demand-letter settlements $5,000-$25,000, out-of-court $25,000-$75,000 (same summaries).

**Workarounds / incumbents:** Overlay widgets (accessiBe, UserWay; widely criticised, not a legal safe harbour), agencies at thousands of dollars, ignoring it.

**Why LLM:** Run axe-core/Lighthouse on key pages, then an LLM writes concrete platform-specific fixes (Shopify Liquid, WordPress) and a plain-English risk report; triage a received letter.

**WTP signals:** Loss event is $5k+, so insurance-style pricing works, but frequency per customer is low and churn after the scan is likely.

**Scores:** Sev 5 / Freq 2 / Build 3 / Crowd 4. Keep to technical scanning with a legal disclaimer.

---

## 7. Restaurant supplier invoices -> per-item cost and price-creep alerts

**Problem / who:** Independent restaurants, cafes, bars, 1-3 locations. Supplier invoices pile up; prices drift; menu margins unknown.

**Evidence**
- MarginEdge lists about $350 per location per month. Reviewers: "You have to put A LOT of work into adding the recipes" (4 stars, Aug 7, 2023); "The delay in invoices posting makes it less than ideal to catch things" (3 stars, Jun 13, 2023). https://www.capterra.com/p/187718/MarginEdge/reviews/ (note: these reviews are 2023, outside your 2025-26 window)
- "Restaurant operators spend up to 500 hours annually recording invoices manually" - traced to a cactus.ai/MIT launchpad idea page, **weak vendor claim**. https://orbit.mit.edu/launchpad/ideas/cactusai

**Workarounds / incumbents:** MarginEdge, MarketMan, Restaurant365, FoodRazor, Diced OS, bookkeeper keying. Price and setup time are the complaints.

**Why LLM:** Photo/email invoice -> normalised line items -> compare to last price paid -> alert on increases. LLMs reduce the recipe/unit/pack-size normalisation burden reviewers complain about.

**WTP signals:** Incumbent at $350/location sets a ceiling and proves budget; a "price-creep alerts only" tool at $29 is a cheaper wedge. No 2025-26 owner-voice quotes found (Reddit blocked).

**Scores:** Sev 4 / Freq 5 / Build 3 / Crowd 4.

---

## 8. Contracts and leases signed without understanding; auto-renewals missed

**Problem / who:** Any small business signing leases, supplier/MSA terms, SaaS and equipment contracts.

**Evidence**
- 62% of small business owners had signed a contract they did not fully understand; 1 in 4 had a legal dispute costing over $10,000; 60% avoided a lawyer due to cost/complexity. Survey cited in a May 19, 2025 BusinessWire release (fetch returned 403; figures are from search summary). https://www.businesswire.com/news/home/20250519395084/en/New-Study-Legal-Pitfalls-Dent-Small-Business-Owners-Bottom-Line-Yet-Most-Forgo-Counsel
- Lawyer review of a commercial lease: $400-650 for a short lease, $600-2,000 for complex ones. https://leaselens.org/commercial-lease-review-cost (**vendor**)

**Workarounds / incumbents:** Pay a lawyer, skim, or paste into a general chatbot. Legal-AI tools target lawyers (Spellbook etc.) or sell templates (LegalZoom, LegalShield).

**Why LLM:** Clause extraction, red-flag summary against a checklist, obligation/renewal/notice-date calendar. Genuinely needs an LLM.

**WTP signals:** Anchor is $400+ per human review; $20/month or $15 per document is an easy sell. Trust and liability are the barrier, not demand.

**Scores:** Sev 4 / Freq 3 / Build 5 / Crowd 4.

---

## 9. State employment-law and HR compliance for firms with no HR person

**Problem / who:** 1-20 employee employers, often hiring across states; owners handle HR alone.

**Evidence**
- Asure 2026 HR Benchmark: "compliance confidence collapsing" for small businesses; owners cited complexity as their biggest difficulty, most small companies handle employment rules alone (press-release fetch timed out; search summary) **[vendor survey]**. https://investor.asuresoftware.com/news-releases/news-release-details/asures-2026-hr-benchmark-report-finds-compliance-confidence
- HR.com 2026: only 32% of organisations are proactive on compliance (search summary).
- Goldman Sachs 10,000 Small Businesses Voices, 2026: 67% say hiring/retaining staff is a challenge; 53% cite the cost of competitive benefits (search summary) **[primary survey]**. https://www.goldmansachs.com/pressroom/press-releases/2026/small-businesses-embrace-ai-but-need-training-and-support-to-fully-harness-it

**Workarounds / incumbents:** Gusto ($49 + $6/person on Simple), Paychex, Justworks, Bambee, SixFifty (handbooks), HR consultants.

**Why LLM:** State-aware handbook generation and "is this legal in my state" Q&A with citations. Risk: hallucinated law; needs retrieval over a curated corpus and citations.

**WTP signals:** Largely bundled into payroll tools; stand-alone willingness unclear.

**Scores:** Sev 4 / Freq 4 / Build 3 (curated legal corpus is the effort) / Crowd 4.

---

## 10. Missed calls and slow first response for home-service leads

**Problem / who:** Plumbers, HVAC, roofers, electricians (1-10 staff) busy on jobs when the phone rings.

**Evidence**
- "Up to 85 percent of people who can't reach you on the first call won't call back"; "$75,000 a year or more in lost revenue"; missed-call text-back recovers "between 30 and 60 percent." Signpost, Jun 30, 2026 **[vendor claim]**. https://www.signpost.com/blog/how-much-business-do-contractors-lose-from-missed-calls/
- 27% of home-service calls unanswered (Invoca) and 78% of homeowners hire the first contractor who responds (search summaries) **[vendor claims]**.
- Contractor on Angi (via 20 Minute Marketing, 2026): "started responding within 2 minutes, my conversion rate went from 1 in 6 to 1 in 3" **[anecdote]**. https://www.20minutemarketing.co/blog/angi-reviews-2026-what-contractors-say
- Paid-lead platforms: BBB complaints from Jan 2026 about $30.31 charged per Thumbtack lead from contacts who say they never made a request (search summary). https://www.bbb.org/us/in/indianapolis/profile/contractor-referral/angi-0382-3041007/complaints

**Workarounds / incumbents:** 24/7 answering services at $200-600/month, Smith.ai, Podium, Jobber/Housecall add-ons, Google LSA.

**Why LLM:** Voice/SMS agent qualifies and books. But this sits next to the excluded "AI chatbot" category, needs telephony (Twilio, 10DLC compliance) and is saturated.

**WTP signals:** Strongest in this report ($200-600/month already paid). Crowding is also maximal.

**Scores:** Sev 5 / Freq 5 / Build 2 / Crowd 5. **Pass unless you have a distribution edge.**

---

## 11. Overpriced reputation tools; owners mainly want reviews requested and answered

**Problem / who:** Local service and retail businesses.

**Evidence**
- Birdeye starts about $350/month and Podium about $399/month, typically $450-600 once add-ons stack; 12-month auto-renew contracts. https://contractortoolstack.com/compare/podium-vs-birdeye/ (**comparison blog**, search summary)
- Cancellation complaints: a Podium customer "charged $998.47 after four written cancellation notices"; a reviewer reported a $7,000 charge after missing a notice window by a week (comparison pages, anecdotal). https://www.fervorstudio.ca/news/podium-vs-birdeye/
- Capterra, Birdeye reviewer (Sep 9, 2026): "the pricing is quite high for smaller teams." https://www.capterra.com/p/152997/BirdEye/reviews/
- Cheap AI replacements already exist ("Reply Champion ... plans starting from $10/mo", search summary). Google review extortion is a rising threat per https://dndseoservices.com/blog/google-reviews-updates-guide-2026/

**Why LLM:** Reply drafting is trivial now, hence commodity.

**Scores:** Sev 3 / Freq 5 / Build 5 / Crowd 5. Not recommended standalone; the price complaint is real but $10 tools already answer it.

---

## 12. Government / RFP bid discovery and fit-scoring for small contractors

**Evidence:** "Finding the right government contract opportunities used to mean spending hours every night on SAM.gov"; "the hardest part ... is not eligibility, it is visibility" (OryonIQ and RFPHawk guides, 2026, **vendor content**). https://www.oryoniq.com/blog/top-tools-find-government-bids-rfps-2026 and https://www.rfphawk.com/blog/small-business-government-contracting. SAM.gov saved-search alerts are free; GovWin is pricey.

**Why LLM:** Read solicitation PDFs, score fit against a capability statement, extract deadlines and set-asides, draft a compliance matrix.

**Scores:** Sev 3 / Freq 3 / Build 3 / Crowd 4. Evidence is entirely vendor-written; no owner complaints found.

---

## 13. Small Shopify stores priced out of helpdesks

**Evidence:** Gorgias bills per ticket plus $0.90-1.00 per AI resolution (each also counts as a ticket); example Black Friday bill $1,242 vs $360 budgeted; a Reddit thread "Who the heck is paying for Gorgias?" drew 80 comments (second-hand); Trustpilot 2.5/5 on 143 reviews (search summaries of 2026 review blogs). https://www.getmacha.com/blog/gorgias-review and https://aisupportcrew.com/guides/gorgias-review-2026

**Why LLM:** Order-aware reply drafts for WISMO/returns. This edges into your excluded "generic AI chatbot" so only pursue as a drafted-reply inbox tied to order data.

**Scores:** Sev 3 / Freq 4 / Build 4 / Crowd 5.

---

## 14. SaaS subscription creep

**Evidence:** Average 10-person team runs 28 subscriptions (up from 19 in 2023); SMBs waste about 27% of SaaS budget; 67% auto-renewed an unused tool in the past year (vendor reports via search summary) **[vendor claims]**. https://www.usecarly.com/blog/saas-statistics/ and https://ramp.com/blog/unused-software-subscriptions

**Note:** Needs card/bank feeds (excluded "heavy banking data") or email-receipt parsing. QuickBooks raised prices again in Aug 2026 (Essentials $75 to $85, Plus $115 to $140 per search summary), which shows cost sensitivity. https://softcrit.com/review/quickbooks-online-review/

**Scores:** Sev 2 / Freq 4 / Build 3 / Crowd 4.

---

## Cross-cutting survey context

- Intuit 2026: 77% of owners experience tax stress; 39% hit by a late payment threatening payroll; only 20% would trust AI alone for financial decisions vs 37% human experts. https://quickbooks.intuit.com/r/small-business-data/business-ownership-in-2026/ and https://www.intuit.com/blog/global-stories/ai-impact-report/ (AI report: more than 3 in 4 SMBs use AI regularly, top uses marketing, customer service, data processing; search summary)
- Goldman Sachs 10KSB 2026: 93% report positive AI impact, only 14% fully integrated, 73% want more training. https://www.goldmansachs.com/pressroom/press-releases/2026/small-businesses-embrace-ai-but-need-training-and-support-to-fully-harness-it
- US Chamber / Justworks: Q2 2026 only 16% very comfortable with cash flow, 57% name inflation top concern; Q3 2026 index rose to 70.5. https://www.uschamber.com/small-business/small-business-index-q2-2026
- Implication: owners adopt AI but trust is task-specific. Narrow, auditable workflows with a human approval step beat open-ended assistants.

---

## Recommendation

Build where (a) the incumbent is enterprise-priced or percentage-fee-priced, (b) the work is document/text extraction, and (c) a human approves before anything is sent.

1. **#2 Order-email-to-draft-order for small wholesalers.** Least crowded self-serve tier. Risk: thin owner-voice evidence; do 10 interviews before building.
2. **#3 Flat-fee dispute packets (Stripe first).** Loudest, freshest complaints (Trustpilot Feb-May 2026) about incumbent fees and win rate. Risk: native Stripe/Shopify tooling; verify first.
3. **#1 AR follow-up that reads replies.** Biggest, most universal pain with primary-survey backing; most crowded. Differentiators: reply parsing plus a flat $15-25 price.
4. **#5 COI tracker (small contractor/property-manager tier).** Clear risk-cost story; extraction fits LLMs; mid-tier gap.

Avoid: #10 (telephony, saturation), #11 (commodity at $10), #13 (generic-chatbot adjacent).

## Evidence gaps to close next (needs a browser with Reddit access)

- Pull r/smallbusiness, r/Contractor, r/restaurateur, r/ecommerce threads for #1, #2, #3, #4, #7 and capture verbatim quotes with dates and upvote counts.
- Check Stripe/Shopify native dispute-automation features and pricing as of Oct 2026 before committing to #3.
- Interview 5 wholesalers/distributors for #2: what they pay today and which system the order lands in.
