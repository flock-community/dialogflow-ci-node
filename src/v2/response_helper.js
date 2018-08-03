// TODO: refactor
const getSpeech = function(data) {
    const queryResult = data.queryResult;

    if (data.queryResult.fulfillmentText)
        return data.queryResult.fulfillmentText;

    const fulfillmentMessages = queryResult.fulfillmentMessages;
    if ((fulfillmentMessages)) {
        if (fulfillmentMessages[0].simpleResponses)
            return fulfillmentMessages[0].simpleResponses.simpleResponses[0].textToSpeech;
    }
    const richResponse = queryResult.webhookPayload.google.richResponse;
    if (richResponse) {
        if (richResponse.items[0].simpleResponse)
            return richResponse.items[0].simpleResponse.textToSpeech;
    }

    throw 'Cannot find speech in response'
}

const getIntent = function(data) {
    return data.queryResult.intent.displayName;
}

module.exports = {
    getSpeech,
    getIntent
};