const Draft = require('./models/Draft');

module.exports = async (slashCommand, message) => {
    if (message.text === "" || message.text === "help") {
        slashCommand.replyPrivate(message, "Initiate a Clutch draft");
        return;
    }

    const activeDraft = await Draft.findOne({
        isActive: true,
        channel: message.channel
    }).select("name").lean();

    if (activeDraft) {
        slashCommand.replyPrivate(message, {
            "text": "Active draft already exists",
            "attachments": [
                {
                    "fallback": `Would you like to create a new draft and archive "${activeDraft.name}"?`,
                    "title": `Would you like to create a new draft and archive "${activeDraft.name}"?`,
                    "callback_id": `archiveDraft`,
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "Create Draft",
                            "text": "Create Draft",
                            "type": "button",
                            "value": "createDraft"
                        },
                        {
                            "name": "no",
                            "text": "No",
                            "type": "button",
                            "value": "no"
                        }
                    ]
                }
            ]
        });
        return;
    }

    const draft = new Draft({
        name: message.text,
        isActive: true,
        channel: message.channel
    });

    draft.save().then(draft => slashCommand.replyPublic(message, `Draft Created: ${name}`));
}