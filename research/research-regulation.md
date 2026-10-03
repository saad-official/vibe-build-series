# Regulation and platform-policy forcing functions for small businesses (2025-2027)
Research date: 2026-10-03. Method: web search (extended mode) plus page fetches. Secondary sources (law-firm and vendor blogs) were used because most official pages were not fetchable (economie.gouv.fr returned 403). Items marked [VERIFY] rest on a single vendor blog or on my own background knowledge and should be re-checked against the official text before you build marketing copy on them.

Score legend (1-5): Urgency (5 = deadline passed or imminent, enforcement live); Reach (5 = millions of SMBs); Build (5 = shippable in 2-3 days solo); Crowded (5 = saturated market, BAD; 1 = open field).

---

## 0. Executive ranking

| Rank | Opportunity | Urgency | Reach | Build | Crowded | Verdict |
|---|---|---|---|---|---|---|
| 1 | US SMS 10DLC / A2P registration copilot (document generator + pre-check) | 5 | 4 | 5 | 3 | Best 3-day build, pain is acute today |
| 2 | EU online-shop "consumer-law compliance scanner" (withdrawal button, green claims, accessibility statement, AI disclosure) | 5 | 4 | 4 | 2 | Best wedge; the withdrawal button went live 19 Jun 2026 and few have a scanner for it |
| 3 | E-invoice PDF to XRechnung/ZUGFeRD/Factur-X converter + validator (LLM extraction) | 4 | 5 | 3 | 3 | Huge long tail; Germany issuing duty starts 1 Jan 2027 |
| 4 | Review-solicitation + Google Business Profile compliance linter | 4 | 5 | 4 | 3 | FTC fake-review rule plus Google April 2026 policy expansion |
| 5 | VSME / supplier sustainability questionnaire auto-answerer | 3 | 3 | 3 | 3 | Value-chain cap shifts SMEs to voluntary standard; questionnaire pain persists |
| 6 | EAA accessibility statement + prioritized fix list for Shopify/WordPress | 4 | 4 | 4 | 4 | Real demand, crowded with overlays and scanners |
| 7 | EU AI Act Art. 50 disclosure + AI-use register generator | 4 | 3 | 4 | 3 | Art. 50 live since 2 Aug 2026; AI literacy obligation softened |
| 8 | Pay transparency job-ad linter + pay-band/gap calculator | 3 | 3 | 4 | 3 | Patchy national transposition; wait-and-see demand |
| 9 | Email bulk-sender (Gmail/Yahoo/Microsoft) checker | 4 | 2 | 5 | 5 | Saturated, 5,000/day threshold limits SMB reach |
| 10 | MTD for Income Tax (UK) | 5 | 5 | 1 | 5 | Do not build: needs HMRC software recognition, crowded |
| - | BOI reporting (US) | 0 | 0 | - | - | Dead for domestic companies (see section 10) |
| - | Digital Product Passport | 1 | 1 | 2 | 2 | Too early, only batteries Feb 2027 |

---

## 1. US SMS A2P 10DLC registration (carrier-mandated, not law)

**What is mandatory.** Any US business sending application-to-person SMS over 10-digit long codes must register a brand and a campaign with The Campaign Registry. Since February 2025 unregistered traffic is blocked by the major carriers (T-Mobile, AT&T, Verizon). Registration involves legal name/EIN, a campaign use-case description, sample messages, opt-in flow proof, and privacy policy/terms URLs.
Sources: https://textbolt.com/blog/10dlc-compliance/ , https://www.tychron.com/the-campaign-registry/ , https://messageiq.io/blogs/10dlc-registration-sms-compliance/

**Who and how many.** Every US SMS-sending SMB (salons, clinics, home services, restaurants, gyms). No clean count exists; likely millions of small senders [VERIFY - no hard number found].

**Penalties.** Not fines: blocking, throttling, and surcharges (about 0.003-0.005 USD per segment registered vs 0.006-0.017 USD per segment unregistered). Separate legal exposure under TCPA for missing consent (not researched in depth here).

**Manual work today.** Brand registration takes 2-5 business days, campaign approval 1-4 weeks, with frequent rejections for vague use-case text, missing opt-in screenshots, or privacy policy lacking SMS data-sharing language. Reported costs: roughly 4 USD brand fee, 15 USD standard vetting (some sources say 100 USD one-time), 10-20 USD per month per campaign.

**Current tools.** Twilio, Telnyx, Plivo, Bandwidth walk-throughs and built-in registration wizards; GoHighLevel/Podium/Textedly wrap it. They collect forms but do not write good submissions.

**App idea: "10DLC Submission Copilot".**
1. User enters business type, website, how customers opt in, message types.
2. LLM drafts: campaign description, 2-5 compliant sample messages with STOP/HELP language, opt-in disclosure text, and a ready-to-publish "SMS terms + privacy policy" page snippet containing the required no-sharing-with-third-parties clause.
3. Checker crawls the user's site and flags: missing privacy policy, no SMS consent checkbox, pre-checked consent, mismatch between business name on site and registration, prohibited content (SHAFT, loan, crypto).
4. Exports a PDF/JSON pack matching the field layout of Twilio/Telnyx/GHL forms plus a rejection-reason decoder (paste the carrier rejection code, get a fix).
5. Upsell: resubmission tracker.

**LLM role.** Drafting and rewriting submissions; classifying rejection messages; extracting consent flow from a screenshot.

**Risks.** Low legal risk if positioned as drafting help, not legal advice. TCPA advice edges into legal territory, so add a disclaimer. No API gate for the document-only version; integrating directly with TCR needs a CSP/ISV relationship.

**Scores:** Urgency 5, Reach 4, Build 5, Crowded 3.

---

## 2. EU consumer-law e-commerce package (withdrawal button, green claims) plus AI disclosure and accessibility statement

### 2a. EU "withdrawal function" (button)
- **Mandatory:** From 19 June 2026 (Directive (EU) 2023/2673), online traders selling B2C distance contracts with a statutory 14-day withdrawal right must provide an on-interface withdrawal function ("withdraw from the contract here"), reachable throughout the withdrawal period, two-step confirmation, automatic confirmation email. A PDF form or "email us" instruction does not comply. Applies to non-EU sellers targeting EU consumers.
- **Sources:** https://www.arnoldporter.com/en/perspectives/advisories/2026/05/eu-withdrawal-button-uk-subscription-rules-and-data-protection-risks-for-us-online-sellers , https://www.heuking.de/en/news-events/newsletter-articles/detail/new-cancellation-button-what-companies-must-implement-by-june-19-2026.html , https://www.freshfields.com/en/our-thinking/blogs/risk-and-compliance/pitfalls-for-e-commerce-how-the-new-eu-withdrawal-button-widerrufsbutton-wi-102ms91
- **Penalties:** Member-state enforcement plus competitor/consumer-association cease-and-desist (in Germany this means Abmahnung warning letters). No SME exemption mentioned.
- **Reach:** Every EU-facing online shop, plausibly 1M+ EU e-commerce SMBs, plus non-EU Shopify merchants shipping to the EU [VERIFY count; my estimate].

### 2b. Empowering Consumers (green claims) Directive (EU) 2024/825
- **Mandatory:** Applies from 27 September 2026 (already live as of today). Generic claims such as "eco-friendly", "green", "climate friendly" banned without recognised excellent environmental performance; product-level "carbon neutral" claims based on offsets banned; self-made sustainability labels without certification banned.
- **Sources:** https://regonance.com/knowledge/empco/green-claims-september-2026 , https://www.certivo.com/blog-details/eu-empowering-consumers-directive-green-claims-rules-from-september-2026
- **Penalties:** Unfair-commercial-practice regime; national fines [VERIFY exact level].

### 2c. EU Accessibility Act (EAA)
- **Mandatory:** In force since 28 June 2025. Consumer-facing e-commerce, banking, ebooks, transport booking, telecom. Presumed-conformity standard EN 301 549 (WCAG 2.1 AA). Microenterprises (under 10 staff AND under 2M EUR turnover) exempt for services. Accessibility statement and complaint mechanism are baseline requirements.
- **Enforcement as of mid-2026:** No confirmed monetary fines imposed under EAA-transposed law yet; activity is NGO and warning-letter led (France: Carrefour court order June 2026 with 6-month compliance window; Germany: competition-law warning letters; Sweden: 124 complaints, mostly e-retail; Netherlands: mandatory self-reporting requests, formal enforcement expected late 2026). Max penalties: Germany up to 100k EUR, Spain/Italy up to 1M EUR, Netherlands up to 900k EUR or 10% revenue, Ireland up to 60k EUR plus 6 months imprisonment. (Other vendor blogs cite 50k EUR per service and daily penalties; treat as unverified.)
- **Sources:** https://www.levelaccess.com/blog/eaa-compliance-in-2026-how-enforcement-has-evolved-and-what-to-expect-next/ , https://www.accessibility.works/european-accessibility-act/
- **Tools and pricing:** accessiBe 59/179/479 USD per month (overlay; overlays keep losing credibility and lawsuits); UserWay 69/169/359 USD per month; axe DevTools Pro 45 USD per user per month, free tier exists; WAVE free, Pope Tech free for 25 pages, from 25 USD per month; Siteimprove roughly 10k+ USD per year (third-party estimate); professional audits 1.5k-5k USD. Sources: Capterra/vendor listings and https://testparty.ai/blog/accessibility-audit-cost-2026

### 2d. EU AI Act Art. 50 (see section 6)

**App idea: "EU Storefront Compliance Scan" (one URL in, prioritized report out).**
1. Crawl the home, product, cart, checkout, and account pages with Playwright.
2. Deterministic checks: is there a withdrawal button/function reachable from the order-confirmation page and account area; is there an accessibility statement and complaint contact; do pages carry GPSR manufacturer/importer info [VERIFY GPSR scope]; cookie banner has equal-prominence reject button.
3. Run axe-core for WCAG 2.1 AA and group failures by template (not per page).
4. LLM pass over product copy and banner text to flag banned generic green claims ("eco-friendly", "carbon neutral") and suggest compliant rewording; flag AI chatbot widgets lacking disclosure.
5. Output: pass/fail matrix with legal citation, copy-paste fixes (HTML for a withdrawal button, accessibility-statement generator, rewrite of green claims), and a monthly re-scan monitor (cheap recurring revenue).

**LLM role.** Classification of claims, drafting statements, mapping findings to remediation snippets per platform (Shopify Liquid, WooCommerce).

**Risks.** Legal liability if the tool says "compliant"; frame as "issues found, not certification". axe-core catches only part of WCAG issues (commonly cited 30-40%), so never claim EAA conformance. Anti-bot protections on target sites. No API gates.

**Scores:** Urgency 5, Reach 4, Build 4 (focused MVP with 4-5 checks), Crowded 2 for the bundled withdrawal/green-claims angle (4 for accessibility alone).

---

## 3. E-invoicing mandates (the biggest long-tail opportunity)

| Country | Status as of 2026-10-03 | Who | Notes |
|---|---|---|---|
| Germany | Receive e-invoices since 1 Jan 2025; **issuing mandatory 1 Jan 2027** (prior-year turnover over 800k EUR) and **1 Jan 2028** (under 800k EUR) | All domestic B2B, about 3.6M businesses (vendor figure) | XRechnung or ZUGFeRD 2.1+ only; PDF/Word no longer counts |
| France | **Reception mandatory for all VAT businesses from 1 Sep 2026**; issuing for large/mid firms from 1 Sep 2026, **SMEs and micro 1 Sep 2027** | All VAT-registered firms | Must use an approved platform (PA); DGFiP publishes the list |
| Belgium | B2B mandate live 1 Jan 2026 via Peppol BIS 3.0 | All taxable persons | 1M+ Peppol receivers registered in first weeks |
| Poland (KSeF) | Mandatory 1 Feb 2026 (large) and 1 Apr 2026 (most others); smallest firms (under PLN 10k monthly invoiced sales) exempt to end-2026; **penalties deferral extended to 1 Jan 2028** (Sept 2026 report) | All VAT taxpayers | 345k+ entities and 87M invoices in first two months; MF offers free e-mikrofirma app |
| Saudi Arabia (ZATCA Phase 2) | Wave 23 (SAR 750k, 31 Mar 2026); **Wave 24 (SAR 375k, 30 Jun 2026)**; **Wave 25 (SAR 187.5k turnover, integrate by 1 Feb 2027)** | VAT-registered by turnover | Fines SAR 5,000-50,000, escalating for repeats; ZATCA notifies directly |
| UAE | Pilot Jul-Dec 2026; large (AED 50M+) must appoint an ASP by 30 Oct 2026, live 1 Jan 2027; **all others ASP by 31 Mar 2027, live 1 Jul 2027** | All in-scope VAT firms | Peppol 5-corner model through accredited providers |
| Malaysia (MyInvois) | Phase 4 (RM1M-5M) mandatory 1 Jan 2026; **below RM1M turnover exempt** (threshold doubled) | Mid-size SMEs | Exemption does not apply if the firm has a corporate shareholder or parent at the RM1M level |
| Pakistan (FBR) | Corporate integration by 1 Jun 2026, non-corporate by 1 Jul 2026 [VERIFY dates]; all sales-tax-registered persons, no turnover floor; fines from PKR 500,000 | Every sales-tax registered person | Needs licensed integrator or PRAL; smaller retailers still issue FBR-registered invoices |

Sources: https://www.e-invoice.app/blog/global-e-invoicing-compliance-2026 , https://www.cleartax.com/de/en/e-invoicing-for-small-businesses-in-germany , https://www.urssaf.fr/accueil/actualites/facturation-electronique.html , https://www.fiscal-requirements.com/news/5994-poland-plans-to-extend-e-invoice-ksef-penalty-deferral-until-the-end-of-2027 , https://www.cleartax.com/sa/zatca-wave24-einvoicing-in-saudi-arabia , https://dev.to/mousah20/zatca-wave-25-what-developers-integrating-before-1-february-2027-need-to-know-4lkn , https://gulfnews.com/business/tax-news/uae-to-launch-pilot-phase-of-electronic-invoicing-system-in-july-2026-1.500424633 , https://sovos.com/regulatory-updates/vat/malaysia-mandatory-e-invoicing-exemption-threshold-increased/ , https://www.e-invoice.app/country/PK

**Manual work today.** Micro firms issue invoices from Word/Excel/PDF templates. They must now output structured XML (EN 16931 CII/UBL) and, in clearance models (Saudi, Pakistan, Malaysia, Poland), submit to a government platform in real time.

**Current tools.** Free: Mustangproject (open-source Java library, validator, REST server; v2.26.0 released 25 Aug 2026), KoSIT validator (official XRechnung validation), several free online validators; Poland's MF e-mikrofirma. Paid: accounting suites (Lexware, sevDesk, Pennylane, Xero/QuickBooks add-ons), Peppol access points, Avalara/Sovos/ClearTax/Pagero for enterprises. SMB invoicing apps typically 8-30 EUR per month [VERIFY].

**App idea: "Invoice-to-E-Invoice" (Germany/France first).**
1. User uploads an existing PDF/Word invoice or photo (or types the fields).
2. LLM with a strict JSON schema extracts seller/buyer, VAT IDs, line items, tax category codes, payment terms, and Leitweg-ID/references; asks the user for missing mandatory fields (EN 16931 business terms).
3. Server (Mustangproject) generates ZUGFeRD PDF/A-3 or XRechnung XML.
4. Validate with KoSIT rules, show red/green with plain-language fix hints ("seller tax number missing", "wrong unit code").
5. Output the valid file, with a receive-side viewer (render XRechnung XML as human-readable PDF, needed because everyone must now RECEIVE e-invoices).
6. Later: country packs (Peppol BIS 3.0 for Belgium, Factur-X for France).

**LLM role.** Messy-PDF extraction and mapping free-text lines to tax categories/units; explaining validation errors; translating DE/FR/PL error text.

**Risks.** Tax authorities accept only valid, compliant files, so a bad file is the user's liability; keep a validation gate and disclaimer. For France you must hand the file to an approved platform (PA); you cannot be the transport layer without approval. For Saudi/Pakistan/Malaysia/Poland clearance you need onboarding certificates, API credentials, or licensed-integrator status, a heavy gate. Stay on file creation and validation for a 3-day build. Java dependency (Mustang) adds a sidecar service.

**Scores:** Urgency 4 (Germany 1 Jan 2027, France reception live), Reach 5, Build 3, Crowded 3 (crowded at ERP/enterprise level, open for a free/cheap converter).

---

## 4. Review-solicitation and Google Business Profile compliance linter

**What changed.**
- FTC Consumer Review Rule (16 CFR Part 465) effective 21 Oct 2024: civil penalties around 51-53k USD per violation for fake, bought, gated, or suppressed reviews.
- Google Business Profile (GBP): video verification now requested for most new or edited profiles (reported ~80%); suspensions up about 80% since 2023 (Sterling Sky data via vendor blogs); April 2026 expansion bans review quotas for employees and requests that ask customers to name specific staff; incentivised reviews and review gating are violations. Google reported removing 240M+ policy-violating reviews in 2024.
- Sources: https://www.leadoracle.ai/blog/ftc-review-rules-google-business-profiles , https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/ , https://www.jxtgroup.com/google-business-profile-verification-in-2026-new-warnings-video-requirements-how-to-stay-compliant/ , https://support.google.com/business/answer/13762416?hl=en

**Reach.** Tens of millions of local businesses use GBP; any SMB soliciting reviews is exposed.

**Manual work today.** Owners paste review-request SMS/email templates, run "happy customers only" gating funnels, and incentivise with discounts, often unknowingly non-compliant. Suspension recovery is a slow appeals process.

**Tools.** Birdeye, Podium, Grade.us, NiceJob and similar (roughly 100-400 USD per month) do review requests; few audit compliance. Agencies sell suspension recovery (hundreds of USD).

**App idea: "Review Request Auditor + GBP Safety Check".**
1. Paste review-request templates (SMS, email, receipt text, QR card copy, staff script).
2. LLM flags gating, incentives, quota language, staff-name steering, and undisclosed incentives; rewrites compliant versions.
3. Business enters name/address/category and the app runs a GBP "suspension risk" checklist (NAP consistency, keyword-stuffed name, virtual address, service-area setup) with a video-verification shot list (signage, street, proof of authority) tailored to the premises type.
4. Optional: paste recent reviews; flag spikes/patterns likely to trigger Google's automated pause.

**Risks.** No Google API gate for the text-only version (GBP API write access requires approval). Do not promise to avoid suspensions. Avoid positioning as a review-removal service.

**Scores:** Urgency 4, Reach 5, Build 4, Crowded 3.

---

## 5. Sustainability data requests hitting SMEs (CSRD Omnibus and VSME)

**What changed.** Omnibus Directive (EU) 2026/470 (adopted 24 Feb 2026, in force 18 Mar 2026) narrows CSRD to companies with more than 1,000 employees and more than 450M EUR turnover (about 80% fewer firms). Large reporters may not request information beyond the voluntary standard from value-chain partners with up to 1,000 employees, starting FY2027. The voluntary SME standard (VSME-based) is reported in force as Delegated Regulation (EU) 2026/1560 [VERIFY number and 24 Sep 2026 date; single source].
Sources: https://www.nortonrosefulbright.com/en/knowledge/publications/1679488b/european-parliament-votes-to-adopt-omnibus-proposal-amending-csrd-and-cs3d , https://www.coolset.com/academy/csrd-under-omnibus-updated-scope-timelines-and-what-companies-should-do-in-2026 , https://dcycle.io/blog/omnibus-csrd-2026-changes/

**Impact.** Mandatory CSRD burden drops, but large customers, banks, and procurement portals (EcoVadis, CDP, bespoke questionnaires) still send SMEs sustainability surveys. The cap gives SMEs a legal reason to answer only with the voluntary standard.

**Penalties.** None directly on SMEs; the cost is lost contracts or tender points.

**Manual work today.** An SME ops/finance person copies energy bills, headcount, and policies into each customer's spreadsheet. Tools: Normative, Plan A, Greenly, Coolset, Sweep (typically 100-500 EUR per month and up [VERIFY]); EcoVadis (roughly 800-5,000+ EUR per year [VERIFY]). Crowded at carbon-accounting level; thin at the "answer this questionnaire from my existing data" level.

**App idea: "Sustainability Questionnaire Answerer".**
1. SME fills one reusable VSME-style profile (headcount, energy, emissions factors, policies) once.
2. User uploads a customer's Excel/PDF questionnaire; the LLM maps each question to the profile, drafts answers with evidence sources, flags gaps, and flags questions exceeding the voluntary-standard cap with a polite reply template citing the Omnibus rule.
3. Export filled workbook.

**Risks.** Accuracy of emissions numbers (greenwashing liability, especially with EmpCo); keep numbers user-entered. No API gates.

**Scores:** Urgency 3, Reach 3, Build 3, Crowded 3.

---

## 6. EU AI Act obligations for small businesses (Art. 50 transparency, literacy, GPAI)

**Status (as of Oct 2026).**
- AI Digital Omnibus (reported as Regulation (EU) 2026/1744 [VERIFY], in force 27 Jul 2026; Parliament endorsed 16 Jun, Council approved 29 Jun) delays Annex III high-risk obligations from 2 Aug 2026 to **2 Dec 2027**, and Annex I product-embedded AI to 2 Aug 2028.
- **Article 50 transparency was not delayed** and applied from 2 Aug 2026: chatbots must disclose AI interaction; providers must machine-readably mark synthetic audio/image/video/text; deployers must label deepfakes and AI-generated public-interest text without human editorial control; emotion-recognition and biometric-categorisation users must notify people. Provider-side marking for systems already on the market before 2 Aug 2026 has until **2 Dec 2026**.
- **Art. 4 AI literacy** was rewritten: from "ensure" a sufficient level to "take measures to support the development of" literacy; no guarantee of individual literacy level required; Commission/Member States to support SMEs with examples.
- Penalty tier for Art. 50: up to 15M EUR or 3% of worldwide turnover, with lower caps for SMEs.
- GPAI obligations fall on model providers, not typical SMBs.
- Sources: https://www.joneswalker.com/en/insights/blogs/ai-law-blog/yes-august-2-still-matters-the-eu-approved-a-high-risk-ai-delay-but-most-trans.html?id=102nbon , https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/ , https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus/ , https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/

**Who/how many.** Any EU business running a website chatbot, publishing AI-generated images/video, or sending AI-written public text; likely hundreds of thousands to millions of SMBs (my estimate), very few aware.

**Manual work today.** Mostly nothing is being done. Tools: enterprise AI-governance platforms (Holistic AI, Credo AI, OneTrust, typically four to five figures per year [VERIFY]); free Commission checklists; cheap training providers selling "AI literacy certificates".

**App idea: "AI Act Lite for SMBs".**
1. Guided inventory: which AI tools the business uses (ChatGPT, Intercom Fin, Midjourney, HeyGen) and for what.
2. Rule engine maps each use to Art. 50 duties (chatbot disclosure, deepfake label, text disclosure) and flags anything near Annex III (HR screening, credit) as 2027-watch.
3. Generates an AI-use register, chatbot disclosure snippet, image-label policy, staff AI-use policy, and an AI-literacy training log with a short quiz (evidence for Art. 4 "measures").
4. Site scanner detects third-party chat widgets and AI-image metadata (C2PA) to prompt for labels.

**LLM role.** Interprets tool descriptions into duties; drafts policy; generates quizzes.

**Risks.** Classification errors carry liability; avoid "you are compliant" language. Rules still moving (marking codes of practice, guidance pending).

**Scores:** Urgency 4, Reach 3, Build 4, Crowded 3.

---

## 7. EU Pay Transparency Directive (job postings, pay-gap reporting)

**What.** Directive (EU) 2023/970, transposition deadline 7 Jun 2026 was missed by most states. As of June 2026 only Italy, Lithuania, Malta, and Slovakia had fully transposed (Greece by late Aug); Belgium and Poland partially; many more drafting; Croatia, Hungary, Luxembourg, Portugal, and Spain had not started. The directive is not directly effective on private employers, so duties arrive state by state. Core duties: pay range or starting pay disclosed before interview; ban on asking salary history; worker right to request pay-level information; gender pay gap reporting for 100+ employee employers with first reports expected June 2027 for the larger tier (directive text sets 150+ first, 100-149 later [VERIFY]); joint pay assessment if gap exceeds 5%.
Sources: https://www.lewissilkin.com/insights/2026/07/01/eu-pay-transparency-directive-2026-employer-compliance , https://www.morganlewis.com/pubs/2026/06/eu-pay-transparency-directive-the-deadline-for-transposition-has-passed-what-now , https://global.lockton.com/us/en/news-insights/eu-pay-transparency-directive-implementation-status , https://ravio.com/blog/everything-you-need-to-know-about-the-eu-pay-transparency-directive

**Reach.** Every EU employer that posts jobs (pre-employment transparency applies to all sizes); gap reporting limited to 100+ staff. Near-term action mostly in IT/LT/MT/SK, with others to follow.

**Penalties.** National, not yet harmonised; compensation claims and burden-of-proof reversal.

**Manual work.** Creating pay bands, job architecture, and rewriting ads. Tools: Ravio, Pave, Beqom, Payscale, Figures (generally priced for 100+ employee firms [VERIFY pricing]).

**App idea: "Pay Range Job-Ad Checker".** Paste a job ad (or URL); LLM and rules check for a pay range or starting pay, gender-neutral wording, no salary-history question, and country-specific rules (a table of which countries have transposed and what they require); generates compliant range text and a basic pay-band template; adds an "is my pay gap above 5%" calculator from a CSV. Low price (about 9-19 EUR per month) for SMB HR.

**Risks.** Rules vary by state and are in flux, so the rule table needs maintenance. No certification gate.

**Scores:** Urgency 3, Reach 3, Build 4, Crowded 3.

---

## 8. Privacy and cookies: UK DUAA, EU Digital Omnibus, US state laws

### UK Data (Use and Access) Act 2025
- Royal Assent 19 Jun 2025. Commencement Regs (No. 6) 2026: new PECR cookie exemptions effective **5 Feb 2026** (analytics, functionality, security, software update, each with strict conditions); **PECR fines raised to UK GDPR levels (17.5M GBP or 4% turnover) on 5 Feb 2026**; **mandatory data-protection complaints procedure with 30-day response effective 19 Jun 2026** [complaints date from one vendor source, VERIFY]. Standard GA4 does not satisfy the analytics exemption (third-party sharing). ICO has written to the top 1,000 UK sites about cookies.
- Sources: https://secureprivacy.ai/blog/uk-data-use-and-access-act-2025-pecr-cookie-consent-changes-and-how-to-comply , https://www.cookiebot.com/en/uk-data-use-and-access-act-duaa/ , https://usercentrics.com/knowledge-hub/data-use-and-access-act-2025-duaa-compliance/

### EU Digital Omnibus (GDPR/cookies)
- Proposed 19 Nov 2025: moves cookie rules into new GDPR Art. 88a, one-click reject, six-month bar on re-asking, browser-signal recognition. As of Sept 2026 the data track is stalled in first reading with 1,750+ amendments; no adoption expected before late 2026 at the earliest. Do not build for it yet.
- Source: https://acompli.ie/news/digital-omnibus-gdpr-cookies-status-september-2026/

### US state privacy laws
- New 1 Jan 2026: Indiana, Kentucky, Rhode Island. Thresholds (100k consumers; Rhode Island 35k) exclude most small businesses; California and Texas are the SMB-relevant exceptions in practice [VERIFY Texas definition]. Cure periods sunsetting through 2026 (Connecticut, Delaware, Kentucky, Minnesota, Montana). California CCPA ADMT/risk-assessment/cyber-audit regulations effective 1 Jan 2026 (audits phased 2028-2030 by size; risk assessments for existing processing by 31 Dec 2027). Colorado AI Act pushed to 1 Jan 2027 and scaled back (SB 189, signed 14 May 2026). Texas TRAIGA effective 1 Jan 2026.
- Sources: https://www.bakerdonelson.com/privacy-laws-ring-in-the-new-year-state-requirements-expand-across-the-us-in-2026 , https://www.thompsoncoburn.com/insights/californias-2026-ccpa-regulations-summary-and-preparation-guide/ , https://www.lawandtheworkplace.com/2026/05/major-developments-put-colorados-ai-law-on-ice-ahead-of-implementation/

**Tools/pricing.** Cookie CMPs are commoditised: Cookiebot free to about 90 EUR per month per domain (billed per subdomain), Iubenda from about 5 EUR per month to about 80-90 EUR per month, Termly about 10 USD per month annual, CookieYes/Osano/Usercentrics similar.
**App idea (differentiated, small).** "DUAA Pack": complaints-procedure generator (30-day SLA template, intake form, log) plus a cookie/tracker scanner that classifies each cookie against the four UK exemptions and says what must go behind consent. The scanner is crowded; the complaints-procedure generator has thin competition but small value.
**Scores (UK DUAA pack):** Urgency 3, Reach 4, Build 4, Crowded 4. **US state laws:** Urgency 2, Reach 2, Build 4, Crowded 5.

---

## 9. Email and payment security rules

### Gmail/Yahoo/Microsoft bulk-sender rules
- Senders over 5,000 messages per day to a provider's consumer addresses must pass SPF, DKIM, DMARC (alignment), support RFC 8058 one-click unsubscribe, and keep spam-complaint rates under 0.3%. Gmail ramped enforcement from Nov 2025 (rejection at SMTP level rather than spam foldering); Microsoft consumer domains enforce for bulk senders; Microsoft down-weights long-term p=none DMARC.
- Sources: https://redsift.com/guides/bulk-email-sender-requirements , https://powerdmarc.com/bulk-email-sender-requirements/ , https://senderreputation.org/blog/microsoft-outlook-bulk-sender-enforcement-2026
- Reach limited to higher-volume SMBs (e-commerce, newsletters). Pricing: Google Postmaster Tools v2 free (Gmail only); PowerDMARC free plan to 10k emails per month, from 12 USD per month; EasyDMARC free to 1k emails per month, from about 36 USD per month; dmarcian quote-based.
- **Verdict:** saturated and well served by free tools; build only as a feature inside another product. Scores: Urgency 4, Reach 2, Build 5, Crowded 5.

### PCI DSS 4.0.1
- Future-dated requirements became mandatory 31 Mar 2025, including 6.4.3 (inventory and justify every script on payment pages) and 11.6.1 (detect tampering of payment-page scripts and headers). For SAQ A merchants (hosted fields/redirect) the PCI SSC removed 6.4.3 and 11.6.1 and replaced them with an eligibility criterion that the site is not susceptible to script attacks, confirmed by the merchant or the PCI-compliant processor.
- Sources: https://cside.com/blog/pci-dss-4-0-1-requirements-6-4-3-11-6-1-client-side-compliance-guide , https://www.feroot.com/blog/pci-dss-4-0-1-requirement-6-4-3-and-11-6-1/
- Reach: SMB merchants on Stripe/Shopify Payments are mostly covered by the processor; the exposed group is custom-checkout and SAQ A-EP merchants. Tools: cside, Feroot, Jscrambler, Source Defense (enterprise pricing). Idea: payment-page script inventory + change monitor for small merchants (weekly crawl, diff, alert, auto-generated 6.4.3 justification table). Buildable but niche, and sign-off needs a QSA. Scores: Urgency 3, Reach 2, Build 4, Crowded 3.

---

## 10. Items not worth building now (and why)

- **US BOI / Corporate Transparency Act:** FinCEN's interim final rule (21 Mar 2025) removed BOI duties for US-formed companies and US persons; a final rule issued 11 Aug 2026 (Federal Register 14 Aug 2026, effective on publication) made that permanent. Only foreign entities registered to do business in the US still report (and without US-person owners). Previously reported US-person data is being deleted. Sources: https://www.mayerbrown.com/en/insights/publications/2026/08/the-final-chapter-fincen-permanently-eliminates-boi-reporting-requirements-for-us-companies-and-us-persons , https://www.hklaw.com/en/insights/publications/2026/06/what-happened-to-fincens-corporate-transparency-act . State-level beneficial-ownership regimes (e.g. New York LLC Transparency Act) were not researched here. Urgency 0 now.
- **UK Making Tax Digital for Income Tax:** live since 6 Apr 2026 for sole traders/landlords with qualifying income over 50k GBP (about 864k people); threshold falls to 30k GBP in Apr 2027 and 20k GBP in Apr 2028 (ICAEW: up to about 3M individuals eventually). Quarterly updates via HMRC-recognised software; first-year soft landing (no late-submission points for the first four quarterly updates, but the 2026/27 return is not covered); 200 GBP fixed penalty after four points; up to 3,000 GBP for record-keeping failures. 30+ products have free tiers (QuickFile under 1,000 ledger entries, Zoho Books, Landlord Studio), bridging software from about 36 GBP per year. Building requires HMRC's software-recognition process and sandbox credentials, which is the real gate. Sources: https://www.bytestart.co.uk/news-insights/864000-sole-traders-and-landlords-face-new-mtd-reporting-rules-from-april-2026/ , https://www.icaew.com/insights/tax-news/2025/aug-2025/up-to-3-million-individuals-may-need-to-comply-with-mtd , https://www.icaew.com/insights/tax-news/2026/mar-2026/penalty-regime-for-mtd-for-income-tax-becomes-clearer . Scores: Urgency 5, Reach 5, Build 1, Crowded 5.
- **EU Digital Product Passport (ESPR):** framework and central registry live 19 Jul 2026 but no product-specific delegated act is in force; batteries first at 18 Feb 2027 (industrial 2 kWh+, EV, LMT); textiles later (2027-2029 estimates conflict). Sources: https://passportcraft.com/insights/dpp-timeline-2026-2030-every-deadline , https://dpp-tool.com/en/blog/espr-delegated-acts/ . Scores: Urgency 1, Reach 1, Build 2, Crowded 2. Revisit when the textile act is published.
- **Cyber Resilience Act:** reporting duties (24-hour early warning, 72-hour notification of actively exploited vulnerabilities and severe incidents) apply from 11 Sep 2026 via ENISA's Single Reporting Platform; open-source stewards from 11 Dec 2027. Hits small hardware/software product makers; niche, engineering-heavy. https://www.enisa.europa.eu/news/the-cra-single-reporting-platform-is-launched , https://digital-strategy.ec.europa.eu/en/policies/cra-reporting
- **EU Data Act:** applicable since 12 Sep 2025; connected-product design obligations from 12 Sep 2026; cloud switching-fee elimination Jan 2027; SME grandfathering for old contracts. Niche to IoT makers and cloud vendors. https://www.eubelius.com/en/news/the-eu-data-act-in-force-what-changes-on-12-september-2025
- **EUDR deforestation:** 30 Dec 2026 for medium/large operators, 30 Jun 2027 for micro/small; simplified one-time declaration for micro/small primary operators (Reg. 2025/2650); delayed repeatedly and a simplification review was due 30 Apr 2026, so expect more change. https://www.coolset.com/academy/the-eu-deforestation-regulation-eudr-what-businesses-need-to-know-and-do
- **UK DMCC subscription rules:** start spring 2027 (auto-renewal, trial reminders, easy cancellation, two cooling-off periods; no SME exemption noted). Watch-list: a subscription-flow compliance checker alongside the withdrawal-button scanner. https://www.arnoldporter.com/en/perspectives/advisories/2026/05/eu-withdrawal-button-uk-subscription-rules-and-data-protection-risks-for-us-online-sellers
- **Meta business verification / WhatsApp Business API:** verification and a valid privacy-policy URL are required before sending template messages; unverified accounts limited to test messaging; verification takes 1-5 business days (up to 14 if documents are incomplete). A document-prep helper is possible but small and tied to Meta's flow. https://blueticks.co/blog/whatsapp-api-without-meta-verification

---

## 11. Suggested path

1. Build the **10DLC Submission Copilot** (Section 1) as the fastest-to-revenue project, or
2. Build the **EU Storefront Compliance Scan** (Section 2), starting with only the withdrawal-button check, the green-claim linter, and the accessibility-statement generator, then add UK DMCC subscription checks and the AI Art. 50 disclosure check.
3. Run the **e-invoice converter/validator** (Section 3) as a second product for Germany with a launch before 1 Jan 2027, using Mustangproject as the engine.
4. Common legal posture for all: "issues found, not legal advice or certification"; keep personal data out of the pipeline; log every rule with its source and date verified.

## 12. Caveats on evidence quality

- Most figures come from vendor and law-firm blogs surfaced through search, not primary legal texts. Single-sourced or unverified: AI omnibus regulation number (2026/1744) and dates, VSME Delegated Regulation number (2026/1560) and date, Pakistan FBR dates, UK DUAA complaints-procedure date, Poland's Sept 2026 penalty deferral to 2028, Pay Transparency reporting tiers, and all SMB tool pricing outside the quoted vendor pages.
- Business-count figures are cited only where a source gave one: Germany 3.6M, Poland 345k entities in two months, UK MTD 864k first wave and up to 3M eventually, Malaysia about 200k firms newly exempt. Other reach estimates (EU e-commerce 1M+, US SMS senders in the millions) are my own estimates.
- France e-invoicing official source (economie.gouv.fr) returned HTTP 403 to my fetch; French dates come from Urssaf and vendor pages.
