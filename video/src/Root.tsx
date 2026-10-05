import { Composition } from "remotion";
import { DOSELY_DURATION, Dosely } from "./apps/dosely/Dosely";
import { PUNCHCARD_DURATION, Punchcard } from "./apps/punchcard/Punchcard";
import { TURNPROOF_DURATION, Turnproof } from "./apps/turnproof/Turnproof";
import { TEMPLOG_DURATION, Templog } from "./apps/templog/Templog";
import { loadFonts } from "./shared/fonts";
import { VIDEO } from "./shared/Stage";

loadFonts();

export function Root() {
  return (
    <>
      <Composition id="punchcard" component={Punchcard} durationInFrames={PUNCHCARD_DURATION} {...VIDEO} />
      <Composition id="dosely" component={Dosely} durationInFrames={DOSELY_DURATION} {...VIDEO} />
      <Composition id="turnproof" component={Turnproof} durationInFrames={TURNPROOF_DURATION} {...VIDEO} />
      <Composition id="templog" component={Templog} durationInFrames={TEMPLOG_DURATION} {...VIDEO} />
    </>
  );
}
