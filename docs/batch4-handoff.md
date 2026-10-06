# Batch 4 handoff — testing the four native apps

Date: 2026-10-06. Apps: Punchcard (paid), Dosely (free), Templog (free), Turnproof (free). Each repo: `apps/mobile` (Expo SDK 57), `apps/web` (landing + API, live on Vercel), `packages/shared` (domain, tested).

| App | Repo | Site | Shared tests | Web tests |
|---|---|---|---|---|
| Punchcard | saad-official/punchcard | https://getpunchcard.vercel.app | 226 | 71 |
| Dosely | saad-official/dosely | https://getdosely.vercel.app | 262 | 156 |
| Templog | saad-official/templog | https://gettemplog.vercel.app | 234 | 99 |
| Turnproof | saad-official/turnproof | https://getturnproof.vercel.app | 271 | 95 |

Every mobile app passes `pnpm typecheck`, `expo lint`, `expo-doctor` (21/21) and `expo export` for Android and iOS. **No app has run on a device yet.** The Windows box could not compile Android natively (repo path contains spaces, which breaks the NDK/ninja build, and both drives are nearly full), so device builds go through EAS cloud or your Mac.

## 1. One-time sign-ins (you)

> Status 2026-10-06: EAS login done (account `sadi123`); all four EAS projects created and EAS Update configured; Punchcard's RevenueCat Test Store key stored as the EAS env var `EXPO_PUBLIC_REVENUECAT_TEST_KEY`; Android development builds queued from this machine. Still yours: the iOS credentials step below and the RevenueCat entitlement/products setup.

1. **Expo / EAS** — in any repo: `cd apps/mobile && npx eas-cli login` (browser). Then, per app, `npx eas-cli init` (creates the EAS project id; it writes `extra.eas.projectId` into `app.json` — commit it) and `npx eas-cli update:configure` (adds `updates.url`). Free plan: 15 Android + 15 iOS cloud builds per month.
2. **RevenueCat (Punchcard only)** — sign up at app.revenuecat.com (GitHub login), create project "Punchcard", open the auto-created **Test Store** and copy its API key into `G:\Vibe Engineering Apps\.secrets\punchcard-revenuecat-test-key.txt`. Then in RevenueCat create entitlement `pro`, products `pro_monthly` / `pro_yearly` in the Test Store, and an offering `default` with both. The app reads the key from `EXPO_PUBLIC_REVENUECAT_TEST_KEY` (put it in `apps/mobile/.env` as `EXPO_PUBLIC_REVENUECAT_TEST_KEY=...`). Release builds need a real store key; dev builds use the Test Store.
3. **Firebase (optional, Android push only)** — create a Firebase project per app, download `google-services.json` into `apps/mobile/`, add `"googleServicesFile": "./google-services.json"` under `android` in `app.json`, and upload the FCM V1 key with `npx eas-cli credentials`. Local notifications, Live Updates and widgets do not need this; only server-sent pushes (weekly summaries, caregiver alerts) do.

## 2. Android 16 phone — the APKs are ready

Development builds finished on EAS on 2026-10-06. Open each link on the phone, install, then on the PC run `cd <app>/apps/mobile && npx expo start --dev-client` (same Wi-Fi, or add `--tunnel`) and open the app. Dev builds show a "Load demo data" row in Settings.

| App | APK |
|---|---|
| Punchcard | https://expo.dev/artifacts/eas/0TxLd3xdOD1hw6-M4w3-sunlx3ka4_uu163eFf2db6A.apk (rebuilt 6 Oct with the splash fix) |
| Dosely | https://expo.dev/artifacts/eas/v3Ye9blhYUeYDPa2vZ260NF1tNJRFNftQrxmDGEv9A4.apk (rebuilt 6 Oct with the icon-alias deep-link fix) |
| Templog | https://expo.dev/artifacts/eas/zEZhBp0SBjMqiUvGBlrBw-6lwvQYZX4QwL59cjuaNvs.apk |
| Turnproof | https://expo.dev/artifacts/eas/Vil5GdUGJlGQEner7Yr5qF39zK_utyAo4R091IEsabs.apk |

Build pages: https://expo.dev/accounts/sadi123/projects/<app>/builds. Re-build any app with `npx eas-cli build -p android --profile development` from its `apps/mobile` folder (commit first; EAS uploads the committed tree).

Check per app:
- **Punchcard**: clock in → Android 16 Live Update appears in the shade with the running job; add the Today widget (2×1 and 4×2); the 4×2 Start button clocks in from the launcher; "still clocked in" notification actions; Settings → Plan → Upgrade opens the RevenueCat Test Store paywall and the purchase unlocks Pro; export a PDF.
- **Dosely**: add a medication due in 2 minutes → notification with Taken / Snooze / Skip (works with the app killed); dose-window Live Update; Next Dose widget; Settings → Appearance → pick a seasonal theme → colours, motif and **app icon** change (Android relaunches the launcher alias); create a circle, join from a second account, mark a dose missed → caregiver push (needs Firebase).
- **Templog**: log a reading from the Today board in two taps; a fail requires a corrective action; start a cooling item → Live Update with the stage progress; Next Check widget; History → export the inspector PDF.
- **Turnproof**: create a property from templates, schedule a turnover, Start → camera before photo (stamp chip shows time + GPS) → checklist → after photo → Room done → Finish → sign in → Publish proof link → open the link in a browser (verified badge) → Revoke → link returns 410.

## 3. iPhone — EAS cloud build (no Mac needed)

The first iOS build per app must create signing credentials with your Apple Developer account, which EAS CLI can only do interactively. Run once per app (it asks for your Apple ID, then registers your iPhone for ad-hoc installs via a link/QR):

```bash
cd apps/mobile && npx eas-cli build -p ios --profile development
```

If the iPhone isn't registered yet, run `npx eas-cli device:create` first and open the link on the phone. After the credentials exist, further iOS builds can be triggered non-interactively from here. Install the build from the EAS build page on the phone and start Metro with `npx expo start --dev-client`.

## 3b. iPhone (your Mac, alternative)

Each repo has `docs/testing-on-mac.md`. Short version:

```bash
git clone https://github.com/saad-official/<app> && cd <app>
pnpm install
cd apps/mobile && npx expo prebuild --platform ios && npx expo run:ios --device
```

Xcode will ask for your team for the app and the `ExpoWidgetsTarget` extension (App Group `group.com.saadofficial.<app>`). Then check: Live Activity on the Lock Screen and Dynamic Island (buttons: Stop/Break, Taken all/Snooze, Log reading/Discarded, Next room), Home and Lock Screen widgets, notification actions, Liquid Glass tabs on iOS 26, and (Dosely) alternate app icons. Alternative without a Mac session: `npx eas-cli build -p ios --profile development` (needs the paid Apple account for the ad-hoc profile).

## 4. What to expect to be rough

- Nothing has been seen on a screen: spacing, haptic timing, sheet heights and the camera overlay will need a feel pass; report what looks off and it gets fixed.
- `expo-live-updates` is alpha: Android Live Updates have no buttons (actions come from the ongoing notification) and no ticking chronometer in Punchcard (text refreshes each minute while the app is open).
- Push from the server (weekly summaries, caregiver alerts) needs the Firebase step; iOS push needs `eas credentials` to upload an APNs key.
- Product videos are recreated from the design system (labelled as such on each landing page), not screen recordings.

## 5. Design QA pass (6 Oct, after the first device tests)

One Opus agent per app audited every screen and component for light/dark correctness, shadows, contrast, layout and native-slop tells, with typecheck, lint and bundle exports as gates. All fixes are committed; they are JavaScript-only, so the installed dev builds pick them up from Metro (Punchcard additionally got a native rebuild for its splash colours).

Root causes of "theme looks bad in dark mode / weird shadows":
- **Dosely, Turnproof:** the shadow colour was the ink colour, which is lighter than the dark surfaces, so every card drew a pale halo. Dark shadows are now black at low opacity; the web tokens follow.
- **Punchcard:** the shadow colour equalled the dark page colour (invisible shadows or dark halos over overlapping surfaces); dark mode now uses a 1 pt rim plus a faint black drop.
- **Templog:** iOS context-menu previews on transparent rows traced a shadow around each glyph; rows got an opaque background.
- **All four:** dark "sunken" fills and separators were ~1.05:1 against the page (invisible wells, text fields, chips, hairlines) → lifted fills; 45%-opacity disabled buttons → neutral fill + tertiary label; shadows removed from translucent blur fallbacks; `boxShadow` never on a clipping view; `textTertiary` no longer used for informative text; Android-only controls (segmented control, action sheet, pull-to-refresh, tab badges) now take the brand palette instead of wallpaper colours; toasts clear the Android tab bar and iOS form sheets.
- **Dosely:** seasonal motifs calibrated to a fixed low contrast, hidden under Reduce Motion; instant scheme switch (no half-faded text); day-grid and swatch text pick white or ink per colour.

Still worth a look on real devices: keypad height on an iPhone SE (Templog), keyboard handling in Android sheets, and a brief white flash in dark mode during keyboard resizes (the Android window background is not set at runtime yet).

### Dosely on Android: icons and dev builds
Changing the seasonal icon on Android enables an `<activity-alias>` and disables `MainActivity`. Two consequences handled in code: the switch is deferred until the app goes to the background (otherwise Android closes the task mid-use), and it is skipped entirely in **development builds**, because expo-dev-launcher starts `MainActivity` by name and would crash on the next launch. To test icon switching on Android use the **preview build** (no dev launcher) listed in section 2; on iOS it works in every build.
