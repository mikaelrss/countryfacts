import { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt/dist/types";

import * as utils from "./utils/properties";
import { getCountry } from "./services/countryService";
import {
  currentCountry,
  currentHintsGiven,
  setCurrentCountry,
  setCurrentHintsGiven,
} from "./state";
import { getProperties, isPropertiesValid } from "./utils/properties";
import { Properties } from "./domain/Country";

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
    throw Error("Du har bedt om et ugyldig hint");
  }

  await ack();
  setCurrentCountry(countryName);
  setCurrentHintsGiven(properties);

  const [country] = await getCountry(countryName);

  const hints = utils.generateHints(country, properties);
  await respond(`Hvilket land skal vi frem til? \n ${hints}`);
};

export const askForHint: SlackCommandMiddleware = async ({
  command,
  ack,
  respond,
}) => {
  if (currentCountry === undefined) {
    throw Error("Hint kan ikke gis før du har stilt et spørsmål");
  }

  const properties = getProperties(command.text);
  if (!utils.isPropertiesValid(properties)) {
    throw Error("Du har bedt om et ugyldig hint");
  }
  await ack();
  const [country] = await getCountry(currentCountry);
  const unusedHints = properties.filter((p) => !currentHintsGiven.includes(p));
  await respond(utils.generateHints(country, unusedHints));
};
