import type { CSSProperties } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS, springAt, standardEase } from "./motion";

type CaptionProps = {
  text: string;
  /** Frame the first word starts entering. */
  delay?: number;
  /** Frames between words. */
  stagger?: number;
  /** Frame the whole caption starts fading out (omit to stay). */
  exitAt?: number;
  /** Words (exact tokens, punctuation included) drawn in `highlightColor`. */
  highlight?: string[];
  highlightColor?: string;
  style?: CSSProperties;
};

/**
 * Big kinetic caption: each word rises into place on a no-overshoot spring, staggered, then the
 * whole line fades out together. Layout never shifts: words are laid out from the first frame
 * and only their opacity/transform animate.
 */
export function Caption({ text, delay = 0, stagger = 3, exitAt, highlight = [], highlightColor, style }: CaptionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  const exit =
    exitAt === undefined ? 1 : interpolate(frame, [exitAt, exitAt + 10], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: standardEase });
  return (
    <div style={{ ...style, opacity: exit }}>
      {words.map((word, i) => {
        const p = springAt(frame, fps, delay + i * stagger, SPRINGS.settle);
        const hl = highlight.includes(word);
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: p,
              transform: `translateY(${(1 - p) * 0.45}em)`,
              color: hl ? highlightColor : undefined,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
}

type SubCaptionProps = { children: React.ReactNode; delay?: number; exitAt?: number; style?: CSSProperties };

/** The quieter supporting line: one fade-and-rise, no per-word motion. */
export function SubCaption({ children, delay = 0, exitAt, style }: SubCaptionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, delay, SPRINGS.settle);
  const exit =
    exitAt === undefined ? 1 : interpolate(frame, [exitAt, exitAt + 10], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ ...style, opacity: p * exit, transform: `translateY(${(1 - p) * 12}px)` }}>{children}</div>;
}
