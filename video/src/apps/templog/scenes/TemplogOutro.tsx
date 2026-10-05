import { Outro } from "../../../shared/Outro";
import { ThermoMark } from "../screens";
import { STEEL_BG, condensed } from "../style";
import { L } from "../tokens";

export const OUTRO_FRAMES = 135;

/** Scene 5: name, promise, URL, on brushed steel with a low heat glow. */
export function TemplogOutro() {
  return (
    <Outro
      background={`radial-gradient(760px 560px at 50% 52%, rgba(232,86,42,0.11) 0%, rgba(232,86,42,0.05) 42%, rgba(232,86,42,0.015) 74%, rgba(232,86,42,0) 100%), ${STEEL_BG}`}
      mark={<ThermoMark size={104} />}
      name="Templog"
      nameStyle={{ ...condensed, fontWeight: 700, fontSize: 116, lineHeight: 1, letterSpacing: -2, color: L.text }}
      promise="Temperature logs the inspector trusts. Free."
      promiseStyle={{ ...condensed, fontWeight: 700, fontSize: 60, lineHeight: 1.04, letterSpacing: -0.8, color: L.text }}
      highlight={["Free."]}
      highlightColor={L.heatText}
      url="gettemplog.vercel.app"
      platforms="iPhone + Android · coming soon"
      textColor={L.text}
      mutedColor={L.textSecondary}
      urlBackground={L.surfaceSunken}
    />
  );
}
