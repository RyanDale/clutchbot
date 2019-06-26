const { series1 } = require('./utils/boosterPacks');

module.exports = async function (slashCommand, message) {
    if (message.text === "" || message.text === "help") {
        slashCommand.replyPrivate(message, "Find a player or strategy card.");
        return;
    }

    const series = message.text;
    let boosterPack;

    switch (series) {
        case 'Series 2':
            // TODO: Implement Series 2 logic once available
            boosterPack = [];
            break;
        default:
            boosterPack = await series1();
    }
    slashCommand.replyPublic(message, 'Pack Size' + boosterPack.length);
}