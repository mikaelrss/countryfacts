export type AvailableHints =
  | ""
  | "area"
  | "borders"
  | "population"
  | "continent"
  | "mean elevation"
  | "coast"
  | "tallest point"
  | "road side"
  | "denmarks"
  | "flag goodness";

export const availableHints: AvailableHints[] = [
  "population",
  "borders",
  "area",
  "continent",
  "tallest point",
  "mean elevation",
  "coast",
  "road side",
  "denmarks",
  "flag goodness"
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
