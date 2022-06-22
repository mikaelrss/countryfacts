import codes from "../data/landCodeMapping.json";
import regions from "../data/regionMapping.json";
import fetch from "node-fetch";

const BASE_URL =
  "https://raw.githubusercontent.com/factbook/factbook.json/master/";

interface Value {
  text: string;
}

export interface FactbookCountry {
  Geography: {
    Elevation: {
      "highest point": Value;
      "lowest point": Value;
      "mean elevation": Value;
    };
    Coastline: Value;
  };
}

const stripNonNumericCharacters = (s: string): number =>
  parseInt(s.replace(/\D/g, ""));

const getCodeFromCountry = (country: string): string => {
  return codes.find(
    (co) => co.name.trim().toLowerCase() === country.trim().toLowerCase()
  )?.code as string;
};

const getRegionFromCountry = (country: string): string => {
  const code = getCodeFromCountry(country);
  let result = "";
  Object.keys(regions).forEach((region) => {
    // @ts-expect-error weird json types
    if (regions[region].includes(code)) {
      result = region;
    }
  });
  return result;
};

const getCountry = async (countryName: string) => {
  const region = getRegionFromCountry(countryName);
  const code = getCodeFromCountry(countryName);

  const url = `${BASE_URL}/${region}/${code}.json`;
  const data = await fetch(url);
  return data.json();
};

export const getCountryInformation = async (
  countryName: string
): Promise<FactbookCountry> => {
  return getCountry(countryName);
};

export const getTallestPoint = (country: FactbookCountry): number => {
  return stripNonNumericCharacters(
    country.Geography.Elevation["highest point"].text
  );
};

export const getMeanElevation = (country: FactbookCountry): number => {
  return stripNonNumericCharacters(
    country.Geography.Elevation["mean elevation"].text
  );
};

export const getCoastline = (country: FactbookCountry): number => {
  return stripNonNumericCharacters(country.Geography.Coastline.text.split("km")[0]);
};

(async () => {
  console.log(await getCountryInformation("norway"));
  console.log(getRegionFromCountry("norway"));
  console.log(getRegionFromCountry("afghanistan"));
  console.log(getRegionFromCountry("ecuador"));
  console.log(getRegionFromCountry("canada"));
  console.log(getRegionFromCountry("tuvalu"));
})();
