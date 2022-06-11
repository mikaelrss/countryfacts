import { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt/dist/types";

import * as utils from "./utils/properties";
import { getCountry } from "./services/countryService";
import {
  currentCountry,
  setCurrentCountry,
  setCurrentHintsGiven,
} from "./state";
import { getProperties } from "./utils/properties";

type SlackCommandMiddleware = Middleware<SlackCommandMiddlewareArgs>;

export const generateQuestion: SlackCommandMiddleware = async ({
  command,
  ack,
  respond,
}) => {
  const [countryName, properties] = utils.getCountryNameAndProperties(
    command.text
  );

  utils.isCountryValid(countryName);
  if (!utils.isPropertiesValid(properties)) {
    throw Error("En egenskap er ikke gyldig");
  }

  await ack();
  setCurrentCountry(countryName);
  setCurrentHintsGiven(properties);

  const country = await getCountry(countryName);

  console.log("Country: ", country);
  console.log("Properties: ", properties);

  const hints = utils.generateHints(country[0], properties);
  await respond(`Hvilket land skal vi frem til? \n ${hints}`);
};

export const addHint: SlackCommandMiddleware = async ({
  command,
  ack,
  respond,
}) => {
  if (currentCountry === undefined) {
    throw Error("Hint kan ikke gis før du har stilt et spørsmål");
  }

  const properties = getProperties(command.text);

};
