import type { ReactNode } from "react";
import { FONT, tabular } from "../../../shared/fonts";
import type { DrawingName } from "../drawings";
import { Drawing, Icon, ProofMark } from "../screens";
import { L } from "../tokens";

/**
 * The public proof page (`apps/web/components/proof/proof-view.tsx`) for the Maple St turnover,
 * in a plain browser card. Source Sans 3, light tokens, drawn sample photos.
 */

const STAMP = "Tue 6 Oct, %t · 43.65, −79.38 (±8 m)";

function Badge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 10px",
        borderRadius: 999,
        background: L.verifiedSoft,
        color: L.verifiedText,
        fontSize: 13,
        lineHeight: "18px",
        fontWeight: 600,
      }}
    >
      <Icon name="verified" size={13} color={L.verified} />
      Verified capture
    </span>
  );
}

function Photo({ title, drawing, time }: { title: string; drawing: DrawingName; time: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600, letterSpacing: 0.6, color: L.textSecondary, textTransform: "uppercase", marginBottom: 6 }}>{title}</div>
      <figure style={{ margin: 0, borderRadius: 16, overflow: "hidden", background: L.surfaceElevated, boxShadow: `0 0 0 1px ${L.separator}, 0px 1px 2px rgba(43,38,32,0.06)` }}>
        <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
          <Drawing name={drawing} />
        </div>
        <figcaption style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div>
            <Badge />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, lineHeight: "17px", color: L.textSecondary, ...tabular }}>
            <Icon name="clock" size={13} color={L.textSecondary} />
            {STAMP.replace("%t", time)}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

function Room({ name, items, before, after }: { name: string; items: string; before: [DrawingName, string]; after: [DrawingName, string] }) {
  return (
    <section style={{ borderTop: `1px solid ${L.separator}`, paddingTop: 18 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0, fontSize: 20, lineHeight: "26px", fontWeight: 600 }}>{name}</h3>
        <p style={{ margin: 0, fontSize: 15, color: L.textSecondary, ...tabular }}>
          {items} checklist items <span style={{ fontWeight: 600, color: L.accentText }}>· Room done</span>
        </p>
      </div>
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Photo title="Before" drawing={before[0]} time={before[1]} />
        <Photo title="After" drawing={after[0]} time={after[1]} />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderRadius: 16, background: L.surfaceElevated, padding: "8px 14px", boxShadow: "0px 1px 2px rgba(43,38,32,0.06)" }}>
      <div style={{ fontSize: 13, lineHeight: "17px", color: L.textSecondary }}>{label}</div>
      <div style={{ fontSize: 19, lineHeight: "25px", fontWeight: 600, ...tabular }}>{value}</div>
    </div>
  );
}

export function ProofPage() {
  return (
    <div style={{ padding: "22px 28px 28px", fontFamily: FONT.sourceSans, color: L.text, background: L.surface }}>
      <header>
        <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: L.accentText }}>
          <ProofMark size={20} />
          Turnover proof
        </p>
        <h1 style={{ margin: "6px 0 0", fontSize: 36, lineHeight: "42px", fontWeight: 700, letterSpacing: -0.6 }}>Maple St</h1>
        <p style={{ margin: "6px 0 0", display: "flex", alignItems: "center", gap: 14, fontSize: 16, color: L.textSecondary, ...tabular }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="clock" size={15} color={L.textSecondary} />
            Tue, 6 Oct 2026 · 11:00–12:04 Toronto time
          </span>
          <span>Took 1 h 4 min</span>
        </p>
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          <Stat label="Rooms done" value="6 / 6" />
          <Stat label="Checklist items" value="22 / 22" />
          <Stat label="Verified photos" value="12 / 12" />
          <Stat label="Issues reported" value="0" />
        </div>
      </header>
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 22 }}>
        <Room name="Bathroom" items="4 of 4" before={["bathroom-before", "11:38"]} after={["bathroom-after", "11:41"]} />
        <Room name="Kitchen" items="4 of 4" before={["kitchen-before", "11:01"]} after={["kitchen-after", "11:14"]} />
      </div>
      <footer style={{ marginTop: 28, borderTop: `1px solid ${L.separator}`, paddingTop: 16, fontSize: 16, color: L.textSecondary }}>
        <p style={{ margin: 0 }}>
          Published with <span style={{ fontWeight: 600, color: L.accentText, textDecoration: "underline" }}>Turnproof</span> · expires 5 December 2026
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: L.textTertiary }}>
          This page is private to whoever has the link. It is not indexed by search engines.
        </p>
      </footer>
    </div>
  );
}

/** A neutral browser window (no real browser chrome or brand): a URL field and the page. */
export function BrowserCard({ url, children, width, height, scroll = 0 }: { url: string; children: ReactNode; width: number; height: number; scroll?: number }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 18,
        overflow: "hidden",
        background: L.surface,
        boxShadow: `0 0 0 1px ${L.border}, 0 40px 80px -36px rgba(43,38,32,0.45), 0 16px 32px -20px rgba(43,38,32,0.3)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 46, flexShrink: 0, background: L.surfaceElevated, borderBottom: `1px solid ${L.separator}`, display: "flex", alignItems: "center", gap: 14, padding: "0 16px" }}>
        <span style={{ display: "flex", gap: 7 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 11, height: 11, borderRadius: 999, background: L.border }} />
          ))}
        </span>
        <span
          style={{
            flex: 1,
            height: 30,
            borderRadius: 999,
            background: L.surfaceSunken,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            fontFamily: FONT.ui,
            fontSize: 13,
            color: L.textSecondary,
          }}
        >
          <Icon name="lock" size={12} color={L.textSecondary} />
          {url}
        </span>
        <Icon name="share" size={18} color={L.textSecondary} />
      </div>
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, transform: `translateY(${-scroll}px)` }}>{children}</div>
      </div>
    </div>
  );
}
