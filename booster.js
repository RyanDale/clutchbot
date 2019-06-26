const { series1 } = require('./utils/boosterPacks');
const getCardUrl = require('./utils/getCardUrl');

module.exports = async function (slashCommand, message) {
    if (message.text === "help") {
        slashCommand.replyPrivate(message, "Generate a random booster pack.");
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

    const formatCard = (card, index) => `${index + 1}. <${getCardUrl(card.name)}|${card.name}> Type: ${card.cardType} Rarity: ${card.rarity}`;

    slashCommand.replyPublic(message, 'Booster Pack:\n' + boosterPack.map(formatCard).join('\n'));
}