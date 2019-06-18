# clutchbot
Slack Slash Command to retreive Clutch Baseball cards by name.

**Local build**
1. Clone the repo to your local
2. Run `npm install`
3. Create a `.env` file
4. Inside of the `.env` file, add the following:
```
TOKEN=Slack App's Token
CLIENT_ID=279750809847.667457704052
CLIENT_SECRET=Slack App's Client Secret
PORT=8765
VERIFICATION_TOKEN=Slack App's Verification Code
CARD_URL=Url to where the card images are hosted
```
5. Install localtunnel

**Run Locally**
1. Run `npm start`
2. Open a second terminal window or tab and run `lt --port 8765 --subdomain clutchbot`
3. Open your browser to https://clutchbot.localtunnel.me/login and authenticate your app
4. In the Slack admin app settings, set your Slash Command Request URL to: https://clutchbot.localtunnel.me/slack/receive
5. In the Slack admin app settings, under OAuth & Permissions, add https://clutchbot.localtunnel.me/oauth to the Redirect URLs, and press the save button
6. Open up Slack and run `/find Freddie Freeman`, a card image should appear

**Deploy to Heroku**
1. Create Heroku App
2. Follow instructions to deploy the repo
3. Once the repo is deployed, set the following config variables:
```
TOKEN=Slack App's Token
CLIENT_ID=279750809847.667457704052
CLIENT_SECRET=Slack App's Client Secret
VERIFICATION_TOKEN=Slack App's Verification Code
CARD_URL=Url to where the card images are hosted
```
4. Restart the server
5. Once restarted, open the web app and go to the /login url
6. At the /login url, allow Slack to authenticate
7. Open up Slack and run `/find Freddie Freeman`, a card image should appear

