import { Composition } from "remotion";
import { DOSELY_DURATION, Dosely } from "./apps/dosely/Dosely";
import { PUNCHCARD_DURATION, Punchcard } from "./apps/punchcard/Punchcard";
import { loadFonts } from "./shared/fonts";
import { VIDEO } from "./shared/Stage";

loadFonts();

export function Root() {
  return (
    <>
      <Composition id="punchcard" component={Punchcard} durationInFrames={PUNCHCARD_DURATION} {...VIDEO} />
      <Composition id="dosely" component={Dosely} durationInFrames={DOSELY_DURATION} {...VIDEO} />
    </>
  );
}
