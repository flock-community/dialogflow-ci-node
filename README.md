# dialogflow-cucumber
Cucumber steps for testing DialogFlow apps

## Install/run
npm install --save-dev dialogflow-cucumber

Run 'dialogflow-cucumber'

## Adding/modifying steps

Add the following to a file in your cucumber load path (e.g. in features/support/load.js):
```
const cucumber = require('cucumber');
require('dialogflow-cucumber').call(cucumber);
```

This ensures the steps are loaded into the project's Cucumber context and allow
for adding and modifying steps.
