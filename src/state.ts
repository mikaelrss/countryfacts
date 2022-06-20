import { AvailableHints } from "./utils/properties";

export const availableHints: AvailableHints[] = [
  "population",
  "borders",
  "area",
  "continent",
  "tallest point"
];

export let currentCountry: string | undefined = undefined;
export let currentHintsGiven: AvailableHints[];

export const setCurrentCountry = (name: string) => {
  currentCountry = name;
};
export const setCurrentHintsGiven = (properties: AvailableHints[]) => {
  currentHintsGiven = properties;
};
export const addCurrentHintsGiven = (properties: AvailableHints[]) => {
  currentHintsGiven = currentHintsGiven.concat(properties);
};

export const clearState = () => {
  currentHintsGiven = [];
  currentCountry = undefined;
};
