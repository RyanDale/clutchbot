require('dotenv').config();

const Botkit = require('botkit');
const Mixpanel = require('mixpanel');
const booster = require('./booster');
const find = require('./find');
const create_draft = require('./create_draft');
const end_draft = require('./end_draft');
const join_draft = require('./join_draft');
const connectToDB = require('./utils/connectToDB');

global.mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
    console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
    process.exit(1);
}

let config = {};
if (process.env.MONGOLAB_URI) {
    const BotkitStorage = require('botkit-storage-mongo');
    config = {
        storage: BotkitStorage({ mongoUri: process.env.MONGOLAB_URI }),
    };
} else {
    config = {
        json_file_store: './db_slackbutton_slash_command/',
    };
}

connectToDB();

const controller = Botkit.slackbot(config).configureSlackApp(
    {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scopes: ['commands', 'incoming-webhook']
    }
);

controller.setupWebserver(process.env.PORT, (err, webserver) => {
    controller
        .createHomepageEndpoint(controller.webserver)
        .createOauthEndpoints(controller.webserver, (err, req, res) => {
            if (err) {
                res.status(500).send('ERROR: ' + err);
            } else {
                res.send('Success!');
            }
        })
        .createWebhookEndpoints(controller.webserver);
});

controller.on('slash_command', (slashCommand, message) => {
    // Invalid token
    if (message.token !== process.env.VERIFICATION_TOKEN) {
        return;
    }

    mixpanel.people.set(message.user_id, { $name: message.user_name });

    switch (message.command) {
        case "/find":
            find(slashCommand, message);
            break;
        case "/booster":
            booster(slashCommand, message);
            break;
        case "/create_draft":
            create_draft(slashCommand, message);
            break;
        case "/end_draft":
            end_draft(slashCommand, message);
            break;
        case "/join_draft":
            join_draft(slashCommand, message);
            break;
        default:
            slashCommand.replyPublic(message, "Command not recognized.");
            global.mixpanel.track('commandNotFound', {
                ...message,
                distinct_id: message.user_id
            });
    }
});

controller.on('block_actions', function(bot, message) {
    console.log("BLOCK_ACTIONS");
});

controller.on('interactive_message_callback', function(bot, message) {
    console.log("INTERACTIVE_MESSAGE_CALLBACK");
});