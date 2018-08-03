const dialogflowSteps = require('./lib/dialogflow_steps');
module.exports = {
    steps: function() {
        dialogflowSteps.steps.call(this);
    },
    responseHelper: dialogflowSteps.responseHelper
};