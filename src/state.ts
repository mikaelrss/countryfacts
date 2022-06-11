import { Properties } from "./domain/Country";

export const availableHints: Properties[] = [
  "population",
  "borders",
  "area",
  "continent",
];

export let currentCountry: string | undefined = undefined;
export let currentHintsGiven: Properties[] = [];

export const setCurrentCountry = (name: string) => {
  currentCountry = name;
};
export const setCurrentHintsGiven = (properties: Properties[]) => {
  currentHintsGiven = properties;
};
