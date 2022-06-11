import { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt/dist/types";

import * as utils from "./utils/properties";
import * as state from "./state";
import { getCountry } from "./services/countryService";
import { getProperties } from "./utils/properties";

const VALID_HINTS = state.availableHints.join(", ");
const INVALID_HINT_MESSAGE = `Du har bedt om et ugyldig hint , Tilgjengelige egenskaper du kan spørre om: ${VALID_HINTS} .`;

export type SlackCommandMiddleware = Middleware<SlackCommandMiddlewareArgs>;

export const generateQuestion: SlackCommandMiddleware = async ({
  command,
  ack,
  respond,
  say,
}) => {
  await ack();
  const [countryName, properties] = utils.getCountryNameAndProperties(
    command.text
  );

  utils.isCountryValid(countryName);
  if (!utils.isPropertiesValid(properties)) {
    await respond(INVALID_HINT_MESSAGE);
    return;
  }

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
  await ack();
  let properties = getProperties(command.text);
  if (state.currentCountry === undefined) {
    await respond("Ingen aktive spørsmål å gi hint for.");
    return;
  }

  if (properties[0] === "") {
    /*
      Randomize the order and pick out exactly 1 hint to give.
     */
    properties = state.availableHints
      .filter((p) => !state.currentHintsGiven.includes(p))
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 1);

    if (properties.length === 0) {
      await respond("Jeg har gitt alle hintene jeg kan gi.");
    }
  }

  if (!utils.isPropertiesValid(properties)) {
    await respond(INVALID_HINT_MESSAGE);
    return;
  }
  const [country] = await getCountry(state.currentCountry);
  const unusedHints = properties.filter(
    (p) => !state.currentHintsGiven.includes(p)
  );

  state.addCurrentHintsGiven(unusedHints);

  console.log(state.currentHintsGiven);

  await say(utils.generateHints(country, unusedHints));
};

export const hintList: SlackCommandMiddleware = async ({ respond, ack }) => {
  await ack();
  await respond(`Tilgjengelige egenskaper du kan spørre om: ${VALID_HINTS} .`);
};
