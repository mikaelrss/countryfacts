import { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt/dist/types";

import * as utils from "./utils/properties";
import * as state from "./state";
import { getCountry } from "./services/countryService";
import { getProperties } from "./utils/properties";
import { availableHints } from "./state";

export type SlackCommandMiddleware = Middleware<SlackCommandMiddlewareArgs>;

export const generateQuestion: SlackCommandMiddleware = async ({
  command,
  ack,
  respond,
  say,
}) => {
  const [countryName, properties] = utils.getCountryNameAndProperties(
    command.text
  );

  utils.isCountryValid(countryName);
  if (!utils.isPropertiesValid(properties)) {
    throw Error("Du har bedt om et ugyldig hint");
  }

  await ack();
  state.setCurrentCountry(countryName);
  state.setCurrentHintsGiven(properties);

  const [country] = await getCountry(countryName);

  const hints = utils.generateHints(country, properties);
  await say(`Hvilket land skal vi frem til? \n ${hints}`);
};

export const askForHint: SlackCommandMiddleware = async ({
  command,
  ack,
  respond,
  say,
}) => {
  const properties = getProperties(command.text);
  await ack();
  if (properties[0] === "list") {
    const hints = availableHints.join(", ");
    await respond(`Tilgjengelige egenskaper du kan spørre om: ${hints} .`);
    return;
  }
  if (state.currentCountry === undefined) {
    await respond("Ingen aktive spørsmål å gi hint for.");
    return;
  }

  if (!utils.isPropertiesValid(properties)) {
    throw Error("Du har bedt om et ugyldig hint");
  }
  const [country] = await getCountry(state.currentCountry);
  const unusedHints = properties.filter(
    (p) => !state.currentHintsGiven.includes(p)
  );
  await say(utils.generateHints(country, unusedHints));
};
