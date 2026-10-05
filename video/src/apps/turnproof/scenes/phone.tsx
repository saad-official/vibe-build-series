import type { ReactNode } from "react";
import { PhoneFrame } from "../../../shared/PhoneFrame";
import type { FlowProps, RoomState } from "../screens";
import { PHONE_SHADOW } from "../style";
import { L, ROOMS } from "../tokens";

/** The phone the Reveal and Core scenes share (same slot, so the join between them is seamless). */
export function TurnproofPhone({ children, island, islandWidth }: { children: ReactNode; island?: ReactNode; islandWidth?: number }) {
  return (
    <PhoneFrame screen={L.surface} bezel="#0B0D0F" shadow={PHONE_SHADOW} indicator="rgba(26,31,36,0.55)" island={island} islandWidth={islandWidth}>
      {children}
    </PhoneFrame>
  );
}

const EMPTY = (index: number): RoomState => ({ checks: ROOMS[index].items.map(() => 0), done: 0 });
const DONE = (index: number): RoomState => ({ before: 1, after: 1, checks: ROOMS[index].items.map(() => 1), done: 1 });

/** "Still needed: 4 required items and an after photo" (`missingText` in turnover-flow.tsx). */
export function missingText(left: number, needsAfter: boolean): string | null {
  const parts = [left > 0 ? `${left} required item${left === 1 ? "" : "s"}` : null, needsAfter ? "an after photo" : null].filter(Boolean);
  return parts.length ? `Still needed: ${parts.join(" and ")}` : null;
}

/** The flow right after Start: Maple St, room 1 (Kitchen), nothing done yet. */
export const FLOW_START: FlowProps = {
  time: "11:00",
  elapsedSeconds: 4,
  page: 0,
  roomsDone: [0, 0, 0, 0, 0, 0],
  rooms: { 0: EMPTY(0), 1: DONE(1), 2: EMPTY(2) },
  scroll: 0,
  primary: "disabled",
  missing: missingText(4, true),
};
