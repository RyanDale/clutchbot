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

    const formatCard = (c, index) => {
        const space = () => `${index + 1}.${index + 1 < 10 ? '  ' : ''}`;
        if (c.cardType === 'Batter' || c.cardType === 'Pitcher') {
            return `${space()} [*${c.rarity}*] <${getCardUrl(c.name)}|${c.name}> - ${c.position} - ${c.cmdOb.trim()} - $${c.salary}`;
        } else if (c.cardType === 'Strategy') {
            return `${space()} [*${c.rarity}*] <${getCardUrl(c.name)}|${c.name}> - ${c.position}`;
        } else if (c.cardType === 'Stadium') {
            return `${space()} [*${c.rarity}*] <${getCardUrl(c.name)}|${c.name}>`;
        }
    };

    slashCommand.replyPublic(message, 'Booster Pack:\n' + boosterPack.map(formatCard).join('\n'));
}