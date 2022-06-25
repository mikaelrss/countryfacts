import { Country } from "../domain/Country";

export const getSideOfRoadMessage = (country: Country[0]) => {
  if (!country.car) {
    return "Det er uvisst hvilken side av veien de kjører på i dette landet";
  }

  return `I dette landet kjører de på ${
    country.car?.side === "right" ? "høyre" : "venstre"
  } side av veien.`;
};
