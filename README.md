# LandDan

A slackbot for asking trivia questions about a country on the form of

> Which country are we looking for? 
> It has an area of 323 802km².
> It has a coastline of 25 148 km.


## Getting started

To get started, you will need to add a few environment variables. 

1. Create a `.env` file at the root of the application. 
2. Add the fields `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, and `SLACK_APP_TOKEN`. You can get the secret values from me.

Now you can start the application by follwing these steps:

1. `git clone git@github.com:mikaelrss/landdan.git && cd landdan` 
2. `yarn install`
3. `yarn dev`

If the application is running in heroku at the same time as you are running it locally, the two services will compete with each other. Ask me to scale down the service in heroku whenevery you want to develop locally.

## Data

The application gets data from two services: [Rest countries](https://restcountries.com/) and [Factbook](https://github.com/factbook/factbook.json).
These are structured as separate modules in the `services` directory. 

## Commands

All code handling the different commands can be found in `commands.ts`. 
