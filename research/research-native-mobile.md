# Batch 4: native mobile apps (research dated 2026-10-05)

Batches 1-3 were web SaaS, AI agents and a journey ladder. Batch 4 ships two **native mobile apps** (iOS + Android) whose differentiator is platform-native surface area: Live Activities, Android 16 Live Updates, widgets, haptics and Liquid Glass. This note records why those two problems, why native now, and which platform facts constrain the build.

## A. Method and honest caveats

- Tools: web search plus page fetches, 2026-10-05. Everything below is linked; I did not add sources beyond those listed.
- **Vendor pages are marketing and are labelled "vendor".** Statistics such as "lose 10-15% of billable time" come from vendors selling the fix. Treat them as hypotheses to validate with 5-10 customer conversations, not as public copy.
- Several statistics are second-hand: the "1 in 5 billable hours" figure is a Tribes.ai study cited by an aggregator page, and I did not open the original study. The medication-adherence figures come from a stats aggregator (Gitnux) and a UK guide page, not from primary clinical papers.
- Reviews (Trustpilot, AlternativeTo, blog rankings) show sentiment from self-selected unhappy users. They show where the pain clusters, not how many users are affected.
- Platform facts (Expo SDK, pricing, free-tier limits) were checked on 2026-10-05 and change often. Re-verify before each build phase, especially `expo-live-updates` (alpha) and EAS quotas.
- App Store listings for the consumer shift apps were checked as listings only. I did not install or test them.

## B. Candidate problems considered and the two chosen

### Chosen 1: Punchcard (field time clock for solo tradespeople and 1-5 person crews)

**Unmet job-to-be-done.** A plumber, electrician or cleaner with a small crew needs to know who was on which job for how long, and turn that into a timesheet or client invoice without relying on memory at the end of the week.

**Evidence.**
- Manual time tracking loses roughly 1 in 5 billable hours (Tribes.ai study, cited by [Agiled time-tracking statistics](https://agiled.app/statistics/time-tracking-statistics); aggregator, original not opened).
- Shops relying on memory or paper lose 10-15% of billable time ([heavyvehicleinspection.com](https://heavyvehicleinspection.com/industries/workshop/technician-labour-tracking-software), **vendor**).

**Existing tools, price, gap.**

| Tool | Price (2026) | Source |
|---|---|---|
| ClockShark Standard | $40/mo + $9/user | [Homebase alternatives](https://www.joinhomebase.com/blog/clockshark-alternatives), [HiveDesk review](https://www.hivedesk.com/clockshark-review) |
| ClockShark Pro | $60/mo + $11/user | same |
| ClockShark contract terms | new customers on 3-year contracts in 2026 | same |
| QuickBooks Time | from $20/mo + $8/user | Homebase alternatives (a competitor's blog, so biased) |

Consumer shift apps with Live Activities exist (Shift: Time Tracker, TrackWork, Overtime Live, Clock Out; App Store listings) but are solo pay-trackers: no client or job exports and no crews. Gap: a phone-first job timer priced for 1-5 people, with a running timer on the lock screen, geofence nudges ("you arrived, start the clock?") and PDF/CSV timesheets, without a 3-year contract.

### Chosen 2: Dosely (medication reminders with a caregiver circle, free)

**Unmet job-to-be-done.** Someone on several medications, or someone helping a parent who is, needs reminders that can be acted on from the notification itself, and a way for a trusted person to be told when a dose is missed.

**Evidence.**
- Medisafe moved to a mandatory paid subscription effective 1 Jan 2026 and capped free use at 2 medications; reviews cite ads, crashes and paywalled basics ([AlternativeTo](https://alternativeto.net/software/medisafe/about/), [Trustpilot UK](https://uk.trustpilot.com/review/medisafe.com)). Sentiment evidence, not a user count.
- Only about 50% of chronic patients adhere to long-term therapy; non-adherence causes about 10% of US hospitalisations at roughly $30B a year ([Gitnux](https://gitnux.org/medication-adherence-statistics/); aggregator).
- 2026 UK data: over 1 in 3 people on prescriptions are non-adherent ([WeCovr](https://wecovr.com/guides/uk-2026-shock-new-data-reveals-over-1-in-3-12/); a guide page, not a primary survey).

**Existing tools, gap.** Medisafe is the incumbent that just tightened its free tier. Indie competitors include Tablets App (ad-free, widgets, multi-profile) and Caregiver Meds. Gap: free with no paywall, actionable reminders, a dose-window Live Activity, a caregiver escalation push, and local-first encrypted data. Risk: this is health-adjacent. The app must say it is a reminder tool, not medical advice, and must not claim clinical effect.

### Rejected

- **Parking meter timer.** Saturated: SpotClock, ParkPing, My Park Timer, Parking Timer & Location, ParqTime and Parksy all already ship Live Activities (App Store listings). Nothing left to differentiate on.
- **Baby tracker (kept as a future candidate).** Strong pain: 1-star reviews cluster on paywalled basics, sync failures and data loss ([Unstar ranking of Huckleberry, Sprout, Glow Baby, Daybook](https://unstar.app/blog/huckleberry-baby-tracker-sprout-glow-baby-daybook-baby-tracker-apps-ranked-2026); a review-analysis blog). But incumbents are large and the native showcase (Live Activity for a running feed or nap, widgets, caregiver sharing) overlaps heavily with Dosely, so building both would demonstrate the same thing twice.

### Scoring

Same scheme as [research-niches.md](research-niches.md): Pain (1-5, 5 = severe), WTP = willingness to pay, Build = buildability in 2-3 days (5 = easy), Crowd = crowdedness (5 = saturated). Composite = Pain + WTP + Build - Crowd.

| Candidate | Pain | WTP | Build | Crowd | Composite | Note |
|---|---|---|---|---|---|---|
| Punchcard (field time clock) | 4 | 4 | 3 | 4 | **7** | Clear price anchor ($40-60/mo + per-user); contracts and per-user fees are the opening |
| Dosely (medication + caregiver) | 4 | 2 | 3 | 4 | **5** | WTP is low by design (free); pain is real but evidence is sentiment-heavy |
| Baby tracker | 4 | 3 | 3 | 5 | **5** | Ties Dosely; overlaps its native showcase; incumbents large |
| Parking meter timer | 2 | 2 | 5 | 5 | **4** | Saturated, low pain |

Honest reading: Dosely does not beat the baby tracker on the composite. It was chosen on tie-break, not on score: the Medisafe pricing change is a dated, documented event, "free with no paywall" is a clear position, and the caregiver circle is the part the other candidates lack. The scores are my judgement from the evidence above, not measurements.

## C. Why native now (Live Activities and widgets as the differentiator)

- Live Activities are the canonical iOS surface for in-progress status. Uber reported **+25% rider app opens during trips** after adopting them ([Newly guide](https://newly.app/guides/ios-live-activities); secondary, vendor-adjacent).
- iOS 26 ActivityKit adds **push-to-start** and **interactive App Intent buttons** on the activity ([Kanopylabs](https://kanopylabs.com/blog/how-to-build-live-activities-dynamic-island-features)). A timer you can stop from the lock screen, or a dose you can mark taken from it, is what makes both products feel native.
- Android 16 adds **Live Updates** via `Notification.ProgressStyle` ([ProAndroidDev](https://proandroiddev.com/live-updates-in-android-16-exploring-the-next-evolution-of-notifications-1a5cf5de2068), [Android codelab](https://developer.android.com/devsite/codelabs/notifications-rich-experience-live-updates)). It is the closest Android equivalent, and it only exists on Android 16 devices, so a fallback is required.

The two chosen problems both have a natural "in progress" state (a job clock running; a dose window open), which is why they fit these surfaces better than, for example, a saved-parking-spot reminder.

## D. Platform and free-tier facts (verified 2026-10-05)

| Area | Fact | Source |
|---|---|---|
| Expo SDK | SDK 57 is latest stable, released 30 Jun 2026; React Native 0.86, React 19.2; New Architecture only | [Expo changelog](https://expo.dev/changelog/sdk-57) |
| iOS widgets + Live Activities | `expo-widgets`: home/lock-screen widgets and Live Activities from components marked with the `'widget'` directive, using only `@expo/ui/swift-ui` and no hooks; local start/update/end; optional APNs push-to-start (iOS 17.2+); needs a dev build, not Expo Go; iOS only | [Expo widgets docs](https://docs.expo.dev/versions/latest/sdk/widgets/), [Expo blog](https://expo.dev/blog/home-screen-widgets-and-live-activities-in-expo.md) |
| Older Live Activity lib | `expo-live-activity` (Software Mansion Labs) is archived (June 2026) in favour of `expo-widgets` | [GitHub](https://github.com/software-mansion-labs/expo-live-activity) |
| Android 16 Live Updates | `expo-live-updates` (Software Mansion Labs): local `startLiveUpdate` / `updateLiveUpdate` / `stopLiveUpdate`, optional FCM, compileSdk 36.1, prebuild required. Early stage with breaking minors. The npm `latest` tag is `0.0.0`; usable releases are `0.1.0-alpha3` under the `alpha` dist-tag | [GitHub](https://github.com/software-mansion-labs/expo-live-updates) |
| Android widgets | `react-native-android-widget` 0.22, with an Expo config plugin | [React Native Relay](https://reactnativerelay.com/article/react-native-android-widgets-expo-glance-2026) |
| Liquid Glass | `expo-glass-effect` (`GlassView` / `GlassContainer`) is iOS 26 only, with a plain `View` fallback; expo-router native tabs give Liquid Glass tabs on iOS 26 and Material tabs on Android | [glass-effect docs](https://docs.expo.dev/versions/latest/sdk/glass-effect), [Expo blog](https://expo.dev/blog/liquid-glass-app-with-expo-ui-and-swiftui) |
| EAS Free plan | 15 Android + 15 iOS builds/month in a low-priority queue; EAS Update to 1K MAU; 60 CI/CD minutes; EAS Submit included. Starter is $19/mo | [Expo pricing](https://expo.dev/pricing), [plans docs](https://docs.expo.dev/billing/plans/) |
| Cloud iOS simulator | EAS Simulator is a waitlist preview, not generally available | [Expo blog](https://expo.dev/blog/build-ios-apps-on-windows-with-cloud-simulators) |
| Device distribution | EAS internal distribution needs a paid Apple Developer account (ad hoc provisioning); free Apple IDs can only sideload via Xcode | [Expo internal distribution](https://docs.expo.dev/tutorial/eas/internal-distribution-builds/) |
| Subscriptions | RevenueCat Test Store: hosted test store auto-provisioned per project; test purchases return production-shaped `customerInfo` / entitlements without App Store Connect or Play Console; works in Expo Go and dev builds. RevenueCat is free below $2.5K monthly tracked revenue, then 1% | [RevenueCat blog](https://www.revenuecat.com/blog/company/revenuecat-test-store), [sandbox docs](https://www.revenuecat.com/docs/test-and-launch/sandbox), [CostBench](https://costbench.com/software/subscription-billing/revenuecat/free-plan/) |
| Auth | Better Auth Expo plugin `@better-auth/expo` with expo-secure-store; backend in Next.js API routes | [Better Auth docs](https://better-auth.com/docs/integrations/expo) |
| Database | Neon Free: 100 projects, 0.5 GB each, 100 CU-hours per project | [Neon plans](https://neon.com/docs/introduction/plans) |
| Agent tooling | Expo skills: Claude Code plugin via `claude plugin install expo@claude-plugins-official`, or `npx skills add expo/skills` (24 skills including expo-overview, expo-router, expo-animation, expo-native-ui, expo-design-system, expo-project-structure, eas-update, eas-workflows, eas-app-stores) | [Claude docs](https://docs.expo.dev/agents/claude), [skills list](https://docs.expo.dev/skills.md) |

Notes on certainty: the RevenueCat 1% figure comes from a third-party cost site, so confirm against RevenueCat's own pricing page before relying on it. The `expo-live-updates` dist-tag situation is the most volatile fact here.

## E. Consequences for the build

- **Dev builds, not Expo Go.** `expo-widgets` and `expo-live-updates` need native code, so every native feature is tested on a development build.
- **Where builds run.** Android dev builds run locally on Windows. iOS builds run on the owner's Mac (or on EAS, counting against the 15 per month).
- **Billing.** RevenueCat Test Store replaces Stripe inside the apps: Apple IAP rules mean in-app digital subscriptions cannot route through Stripe Checkout. Dosely has no paywall at all.
- **Pin `expo-live-updates` behind an adapter.** It is alpha with breaking minors. Wrap it in one module with an ongoing-notification fallback for Android below 16 and for the case where the library breaks, so the rest of the app never imports it directly.
- **Batch native changes.** With 15 builds per platform per month on a low-priority queue, group native changes (config plugins, widget targets, new native modules) into few builds and ship all JS changes through EAS Update (within the 1K MAU cap).
- **Distribution to real devices** needs a paid Apple Developer account for ad hoc builds; without one, iOS testing is limited to Xcode sideloading on the owner's Mac.
- **Health copy discipline (Dosely).** Reminder tool only; no dosing advice; local-first encrypted storage so no health data reaches a free-tier backend by default.

## F. Apps 12 and 13 (added 2026-10-06)

The owner asked for two more native apps after Punchcard and Dosely: small or medium, free is fine, must stand out in their category. Searches on 2026-10-06 (same caveats as section A).

### Chosen 3: Templog (free food-safety temperature log for small kitchens)
- **Rule the app encodes.** FDA Food Code 3-501.14 two-stage cooling (135→70 °F within 2 h, then →41 °F within the following 4 h) and 3-501.16 holding (hot ≥135 °F, cold ≤41 °F); best practice is a holding check every 2 h ([Transact](https://www.transact-tech.com/resources/blog/temperature-danger-zone), [open-exam-prep RE/HS guide](https://open-exam-prep.com/study-guides/rehs/food-safety-inspections/fda-food-code-temperature-control)).
- **Pain.** Staff forget checks and paper sheets get lost ([Xenia, vendor](https://www.xenia.team/articles/best-food-temperature-log-apps); [ThermoWorks, vendor](https://www.thermoworks.com/still-using-paper-temperature-logs/)).
- **Incumbent pricing.** ThermoWorks from $9/mo, Zip HACCP $59.99/location/mo, FoodDocs from $84/mo, Jolt "requires more training" ([Xenia](https://www.xenia.team/articles/best-food-temperature-log-apps), [Operandio](https://operandio.com/food-safety-app/), [FoodDocs](https://www.fooddocs.com/post/food-safety-app)). All are chain-oriented SaaS.
- **Gap.** A free, offline-first, single-kitchen log whose reminders reach the line (Live Activity cooling timers, widgets, push) and whose PDF an inspector accepts.

### Chosen 4: Turnproof (free turnover checklist with photo proof for cleaners and small hosts)
- **Pain.** "It wasn't clean" and damage disputes are decided by timestamped before/after photos per room; without them hosts "have almost no way to prove" their case ([Timemark](https://www.timemark.com/blog/how-airbnb-handles-cleaning-disputes), [STR Specialist](https://strspecialist.com/airbnb-cleaning-photo-proof-the-simple-system-that-ends-it-wasn-t-clean-)). Airbnb's 2026 damage policy §3.3.3 reserves the right to deny AI-generated or unverifiable evidence; AirCover claims must be filed within 14 days ([RedAwning](https://www.redawning.com/pm/post/airbnb-policy-changes-2026-property-managers)).
- **Adoption.** Cleaning software is used by 52% of operators with 1–5 properties (Hostfully 2026 Tech Stack Study, 2,248 accounts; [Hostfully, vendor](https://www.hostfully.com/blog/airbnb-cleaning-software/)).
- **Incumbents.** Turno from $10 per feature per month, TurnFlow $79/mo flat, Breezeway/Properly/Operto for larger operators ([GetApp](https://www.getapp.com/real-estate-property-software/a/turno/), [Capterra](https://www.capterra.com/p/10044803/TurnFlow/)). They are host-side scheduling platforms or marketplaces.
- **Gap.** A cleaner-first, free app: camera-only proof photos stamped with time, GPS and a content hash, a Live Activity for the turnover in progress, and a proof link the host opens without an account.

### Considered and dropped
- Shared pet-care tracker: many 2026 entrants already do household sync (Pawlo, DogNote, Dog Daily, PawLog) ([Pawlo blog](https://getpawlo.app/blog/best-shared-pet-care-apps-couples-2026)).
- Contractions timer: one-time use, small audience.
