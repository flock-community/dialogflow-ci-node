# dialogflow-ci
Cucumber steps for testing DialogFlow apps

## Install/run
npm install --save-dev dialogflow-ci

Run 'dialogflow-ci'

If you intend to use DialogFlow v2, follow the steps here to setup authentication for your project:
  https://dialogflow.com/docs/reference/v2-auth-setup

## Creating test scenarios
Test scenarios are written using Cucumber: https://cucumber.io/

An example test scenario is given in features/example.feature

## Adding/modifying steps

Add the following to a file in your cucumber load path (e.g. in features/support/load.js):
```
const cucumber = require('cucumber');
require('dialogflow-ci').steps.call(cucumber);
```

This ensures the steps are loaded into the project's Cucumber context and allow for adding and modifying steps.


## Example test run

For v1, run:
```
TOKEN=<access token generated from your service account> VERSION=v1 npm test'
```

For v2, run:
```
TOKEN=<access token generated from your service account> ID=<your project id> VERSION=v2 npm test'
```

## Dowloading/Uploading projects

Run:
```
npm link
TOKEN=<access token generated from your service account> VERSION=<your version> dialogflow-cli <download|upload> <target dir> <project id>
```

This downloads/uploads all the intents/entities from your project as json files to/from the specified directory.
