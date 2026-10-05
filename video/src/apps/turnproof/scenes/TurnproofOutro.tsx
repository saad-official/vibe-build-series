import { FONT } from "../../../shared/fonts";
import { Outro } from "../../../shared/Outro";
import { TurnproofAppIcon } from "../screens";
import { L } from "../tokens";

export const OUTRO_FRAMES = 135;

/** Scene 5: name, promise, URL. */
export function TurnproofOutro() {
  return (
    <Outro
      background={`radial-gradient(820px 600px at 50% 50%, rgba(31,107,74,0.11) 0%, rgba(31,107,74,0.055) 40%, rgba(31,107,74,0.02) 72%, rgba(31,107,74,0) 100%), ${L.surface}`}
      mark={<TurnproofAppIcon size={96} shadow="0 0 0 1px rgba(43,38,32,0.10), 0 12px 24px -14px rgba(43,38,32,0.4)" />}
      name="Turnproof"
      nameStyle={{ fontFamily: FONT.sourceSans, fontWeight: 700, fontSize: 108, lineHeight: 1, letterSpacing: -2.4, color: L.text }}
      promise="Proof that the turnover happened. Free."
      promiseStyle={{ fontFamily: FONT.sourceSans, fontWeight: 700, fontSize: 56, lineHeight: 1.1, letterSpacing: -1.1, color: L.text }}
      highlight={["Free."]}
      highlightColor={L.accentText}
      url="getturnproof.vercel.app"
      platforms="iPhone + Android · coming soon"
      textColor={L.text}
      mutedColor={L.textSecondary}
      urlBackground={L.accentSoft}
    />
  );
}
