import { App } from "@slack/bolt";

import { askForHint, generateQuestion, hintList } from "./commands";
import { clearState } from "./state";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.command("/land", generateQuestion);
app.command("/hint", askForHint);
app.command("/hintlist", hintList);

app.message(":lollipop:", async ({ message, say }) => {
  console.log("Cleared state");
  clearState();
});app.message("Dan! Ta deg en bolle", async ({ message, say }) => {
  console.log("Cleared state");
  clearState();
});

(async () => {
  try {
    await app.start(3001);
    console.log("App listening on port 3001");
  } catch (e) {
    process.exit(1);
  }
})();
