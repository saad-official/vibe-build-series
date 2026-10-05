import { condensed } from "../../../shared/fonts";
import { Outro } from "../../../shared/Outro";
import { PunchMark } from "../screens";
import { C } from "../tokens";

export const OUTRO_FRAMES = 135;

/** Scene 5: name, promise, URL. */
export function PunchcardOutro() {
  return (
    <Outro
      background={C.surface}
      mark={<PunchMark height={84} />}
      name="Punchcard"
      nameStyle={{ ...condensed, fontWeight: 800, fontSize: 112, lineHeight: 1, letterSpacing: -1, color: C.text }}
      promise="Tap once. Bill every hour."
      promiseStyle={{ ...condensed, fontWeight: 800, fontSize: 64, lineHeight: 1, color: C.text }}
      highlight={["Bill", "every", "hour."]}
      highlightColor={C.accent}
      url="getpunchcard.vercel.app"
      platforms="iPhone + Android · coming soon"
      textColor={C.text}
      mutedColor={C.textSecondary}
      urlBackground={C.surfaceElevated}
    />
  );
}
