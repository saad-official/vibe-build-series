import type { CSSProperties, ReactNode } from "react";

export const PHONE = {
  width: 300,
  height: 620,
  bezel: 9,
  /** Inner screen size; every screen component is laid out for this. */
  screenWidth: 282,
  screenHeight: 602,
} as const;

type Props = {
  children: ReactNode;
  /** Screen background (the app's surface token). */
  screen: string;
  variant?: "iphone" | "android";
  /** Bezel colour; the phone is always a dark object. */
  bezel?: string;
  /** Hairline around the bezel so it reads on a dark backdrop. */
  rim?: string;
  /** Dynamic Island width (grows for a compact Live Activity). */
  islandWidth?: number;
  /** Content inside the Dynamic Island (compact Live Activity). */
  island?: ReactNode;
  /** Home indicator colour (contrasts with the screen). */
  indicator?: string;
  /** Override the device shadow (lighter on light stages). */
  shadow?: string;
  style?: CSSProperties;
};

/**
 * An iPhone-style frame with a Dynamic Island (or an Android frame with a punch-hole camera).
 * Fixed size so every scene frames the phone at the same scale; depth comes from one soft
 * shadow, not from glass effects.
 */
export function PhoneFrame({ children, screen, variant = "iphone", bezel = "#0B0C0E", rim = "rgba(255,255,255,0.14)", islandWidth = 96, island, indicator = "rgba(255,255,255,0.7)", shadow, style }: Props) {
  const ios = variant === "iphone";
  const outerRadius = ios ? 50 : 40;
  const innerRadius = outerRadius - PHONE.bezel;
  return (
    <div
      style={{
        position: "relative",
        width: PHONE.width,
        height: PHONE.height,
        borderRadius: outerRadius,
        background: bezel,
        padding: PHONE.bezel,
        boxShadow: shadow ?? `0 0 0 1px ${rim}, 0 40px 80px -30px rgba(0,0,0,0.55), 0 18px 36px -18px rgba(0,0,0,0.45)`,
        ...style,
      }}
    >
      {/* Side buttons. */}
      {ios ? (
        <>
          <span style={{ position: "absolute", left: -3, top: 112, width: 3, height: 26, borderRadius: 2, background: bezel }} />
          <span style={{ position: "absolute", left: -3, top: 152, width: 3, height: 46, borderRadius: 2, background: bezel }} />
          <span style={{ position: "absolute", right: -3, top: 160, width: 3, height: 70, borderRadius: 2, background: bezel }} />
        </>
      ) : (
        <span style={{ position: "absolute", right: -3, top: 130, width: 3, height: 80, borderRadius: 2, background: bezel }} />
      )}
      <div
        style={{
          position: "relative",
          width: PHONE.screenWidth,
          height: PHONE.screenHeight,
          borderRadius: innerRadius,
          overflow: "hidden",
          background: screen,
        }}
      >
        {children}
        {ios ? (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              width: islandWidth,
              height: 28,
              transform: "translateX(-50%)",
              borderRadius: 999,
              background: "#000",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
              overflow: "hidden",
            }}
          >
            {island}
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: 11,
              left: "50%",
              width: 12,
              height: 12,
              transform: "translateX(-50%)",
              borderRadius: 999,
              background: "#000",
              zIndex: 20,
            }}
          />
        )}
        {/* Home indicator / gesture bar. */}
        <div
          style={{
            position: "absolute",
            bottom: 7,
            left: "50%",
            width: ios ? 104 : 90,
            height: 4,
            transform: "translateX(-50%)",
            borderRadius: 999,
            background: indicator,
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
}
