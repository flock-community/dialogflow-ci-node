// TODO: refactor
const getSpeech = function(data) {
    const fulfillment = data.result.fulfillment;
    if (fulfillment.speech)
        return fulfillment.speech;

    if (fulfillment.messages) {
        let answerFunc = (message) => {
            return message.speech || message.textToSpeech;
        };
        const message = fulfillment.messages.find(answerFunc);
        if (message)
            return answerFunc(message);
    }
    if ((((fulfillment.data || {}).google || {}).richResponse || {}).items) {
        answerFunc = (message) => {
            const res = message.simpleResponse || {};
            return res.speech || res.textToSpeech;
        };
        const message = fulfillment.data.google.richResponse.items.find(answerFunc);
        if (message)
            return answerFunc(message);
    }
    return undefined;
}

const getIntent = function(data) {
    return data.result.metadata.intentName;
}

module.exports = { getSpeech, getIntent };