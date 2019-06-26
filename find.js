const axios = require('axios');
const getCardUrl = require('./utils/getCardUrl');

module.exports = function find(slashCommand, message) {
    if (message.text === "" || message.text === "help") {
        slashCommand.replyPrivate(message, "Find a player or strategy card.");
        return;
    }

    const name = message.text;
    const cardUrl = getCardUrl(name);
    axios.get(cardUrl).then(() => {
        const card = {
            attachments: [
                {
                    fallback: name,
                    pretext: name,
                    image_url: cardUrl
                }
            ]
        };
        slashCommand.replyPublic(message, card);
        global.mixpanel.track('findCard', {
            ...message,
            fileName: fileName,
            success: true,
            distinct_id: message.user_id
        });
    }).catch(() => {
        slashCommand.replyPublic(message, `Card with the name "${name}" not found!`);
        global.mixpanel.track('findCard', {
            ...message,
            success: false,
            distinct_id: message.user_id
        });
    });
}