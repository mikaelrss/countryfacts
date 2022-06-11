import { App } from "@slack/bolt";

import { askForHint, generateQuestion } from "./commands";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.command("/generate", generateQuestion);
app.command("/hint", askForHint);

(async () => {
  try {
    await app.start(3001);
    console.log("App listening on port 3001");
  } catch (e) {
    process.exit(1);
  }
})();
