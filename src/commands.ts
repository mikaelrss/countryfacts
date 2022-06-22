import { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt/dist/types";

import * as utils from "./utils/properties";
import * as state from "./state";
import { getProperties } from "./utils/properties";
import { clearState, currentCountry } from "./state";

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
  if (!utils.isHintsValid(properties)) {
    await respond(INVALID_HINT_MESSAGE);
    return;
  }

  state.setCurrentCountry(countryName);
  state.setCurrentHintsGiven(properties);

  const hints = await utils.generateHints(countryName, properties);
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

  if (!utils.isHintsValid(properties)) {
    await respond(INVALID_HINT_MESSAGE);
    return;
  }
  const unusedHints = properties.filter(
    (p) => !state.currentHintsGiven.includes(p)
  );

  state.addCurrentHintsGiven(unusedHints);

  await say(await utils.generateHints(state.currentCountry, unusedHints));
};

export const hintList: SlackCommandMiddleware = async ({ respond, ack }) => {
  await ack();
  await respond(`Tilgjengelige egenskaper du kan spørre om: ${VALID_HINTS} .`);
};

/**
 * Clears the statue of the current guess and given hints.
 */
export const clearStateHandler: Middleware<any> = async () => {
  clearState();
};

/**
 * Checks if the received message contains the correct country.
 * Says :lollipop: (meaning correct answer) to the channel is the
 * correct country is guessed.
 */
export const checkIfGuessIsCorrect: Middleware<any> = async ({
  say,
  message,
}) => {
  if (message.text == currentCountry) {
    await say(`:lollipop:`);
    clearState();
    return;
  }
  /*
  This feature is a little annoying at the moment. Could work if we check if
  the message contains a country.
   */
  // if (currentCountry !== undefined) {
  //   await say("Nei, det er dessverre ikke korrekt.")
  // }
};
