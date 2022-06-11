import { Properties } from "./domain/Country";
import { SlackCommandMiddleware } from "./commands";

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

export const clearState = () => {
  currentHintsGiven = [];
  currentCountry = undefined;
};
