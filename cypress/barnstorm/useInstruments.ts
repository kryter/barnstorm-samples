import { useInstrumentSet, InstrumentSet } from "@kryter/barnstorm/lib/InstrumentSet";
import { useMechanics } from "@kryter/barnstorm-cypress/lib/useMechanics";

const mechanicGroup = useMechanics();

export function useInstruments(): InstrumentSet {
  return useInstrumentSet(mechanicGroup);
}
