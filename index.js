const dialogflowSteps = require('./lib/dialogflow_steps');
module.exports = {
    steps: function() {
        dialogflowSteps.steps.call(this);
    },
    queryData: dialogflowSteps.queryData,
    getSpeech: dialogflowSteps.getSpeech,
    getIntent: dialogflowSteps.getIntent
};