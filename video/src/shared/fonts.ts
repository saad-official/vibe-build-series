import { continueRender, delayRender, staticFile } from "remotion";

/**
 * Local variable fonts (OFL, downloaded once from Google Fonts into public/fonts) so renders
 * work offline and every frame waits for the face to load. Inter stands in for SF Pro / Roboto
 * inside the phone screens; Archivo (with its width axis), Atkinson Hyperlegible Next and
 * Source Sans 3 (latin subset) are the landing-page headline faces.
 */
export const FONT = {
  ui: "'Inter Var', 'Segoe UI', system-ui, sans-serif",
  archivo: "'Archivo Var', 'Inter Var', system-ui, sans-serif",
  atkinson: "'Atkinson Next Var', 'Inter Var', system-ui, sans-serif",
  sourceSans: "'Source Sans 3 Var', 'Inter Var', system-ui, sans-serif",
} as const;

const FACES: { family: string; file: string; stretch?: string }[] = [
  { family: "Inter Var", file: "inter-var.woff2" },
  { family: "Archivo Var", file: "archivo-var.woff2", stretch: "62% 125%" },
  { family: "Atkinson Next Var", file: "atkinson-next-var.woff2" },
  { family: "Source Sans 3 Var", file: "source-sans-3-latin-var.woff2" },
];

let started = false;

/** Call once at module scope (Root). Blocks rendering until all faces are ready. */
export function loadFonts(): void {
  if (started || typeof document === "undefined") return;
  started = true;
  const handle = delayRender("Loading local fonts");
  Promise.all(
    FACES.map(async ({ family, file, stretch }) => {
      const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)}) format("woff2")`, {
        weight: "100 900",
        stretch,
        display: "block",
      });
      await face.load();
      document.fonts.add(face);
    }),
  )
    .then(() => continueRender(handle))
    .catch((error) => {
      console.error(error);
      continueRender(handle);
    });
}

/** Archivo at the landing page's condensed headline width. */
export const condensed = { fontFamily: FONT.archivo, fontVariationSettings: '"wdth" 68' } as const;
export const tabular = { fontVariantNumeric: "tabular-nums" } as const;
