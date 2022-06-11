import { Country, Properties } from "../domain/Country";
import { availableHints } from "../state";
import {format, formatPlace} from "./formatting";

export const isCountryValid = (name: string): boolean => true;

export const isPropertiesValid = (
  properties: Properties[] | string[]
): properties is Properties[] =>
  !(properties as Properties[]).some((p) => !availableHints.includes(p));

export const getProperties = (text: string) => {
  return text.split(",").map((s) => s.trim().toLowerCase());
};

export const getCountryNameAndProperties = (
  text: string
): [string, string[]] => {
  const [argument1, argument2] = text.split(";");
  const name = argument1.trim().toLowerCase();
  return [name, getProperties(argument2)];
};

const mapPropertyToHint = (country: Country[0], property: Properties) => {
  switch (property) {
    case "area":
      return "Arealet er " + format(country.area) + "km².";
    case "borders":
      if (country.borders) {
        return "Landet grenser til " + country.borders.length + " andre land.";
      }
      return "Landet grenser ikke til noen andre land.";
    case "population":
      return "Det har " + format(country.population) + " innbyggere.";
    case "continent":
      if (country.continent) {
        return "Landet ligger i " + formatPlace(country.continent) + ".";
      }
      if (country.region) {
        return "Landet ligger i " + country.region + ".";
      }
      return "Det er uvisst hvor landet ligger.";
  }
  console.log("Ikke gjenkjent: ", property);
  throw Error("En egenskap er ikke gjenkjent");
};

export const generateHints = (
  country: Country[0],
  properties: Properties[]
) => {
  return properties.reduce(
    (acc, next) => acc + "\n" + mapPropertyToHint(country, next),
    ""
  );
};
