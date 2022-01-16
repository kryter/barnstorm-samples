import { InstrumentSet } from "@kryter/barnstorm/lib/InstrumentSet";
import { createMechanicGroup } from "@kryter/barnstorm-cypress/lib/createMechanicGroup";

const mechanicGroup = createMechanicGroup();

export function useInstruments(): InstrumentSet {
  return new InstrumentSet(mechanicGroup);
}

export type AppInstruments = ReturnType<typeof useInstruments>;
