const axios = require('axios');

module.exports = function find(slashCommand, message) {
    if (message.text === "" || message.text === "help") {
        slashCommand.replyPrivate(message, "Find a player or strategy card.");
        return;
    }

    const name = message.text;
    const fileName = name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ]/g, "").toLowerCase();
    const cardUrl = `${process.env.CARD_URL}/${fileName}.png`;
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
    }).catch(() => {
        slashCommand.replyPublic(message, `Card with the name "${name}" not found!`);
    });
}