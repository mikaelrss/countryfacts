import { App } from "@slack/bolt";

import {
  askForHint,
  checkIfGuessIsCorrect,
  clearStateHandler,
  generateQuestion,
  hintList,
} from "./commands";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.command("/land", generateQuestion);
app.command("/hint", askForHint);
app.command("/hintlist", hintList);

app.message(":lollipop:", clearStateHandler);
app.message("Dan! Ta deg en bolle", clearStateHandler);

app.message(checkIfGuessIsCorrect);

(async () => {
  try {
    await app.start(process.env.PORT || 3001);
    console.log("App listening on port 3001");
  } catch (e) {
    process.exit(1);
  }
})();
