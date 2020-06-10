import { google } from "googleapis";
const fs = require("fs");

const TOKEN_PATH = "token.json";

const authorize = callback => {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GCAL_CLIENT_ID,
        process.env.GCAL_CLIENT_SECRET,
        process.env.GCAL_REDIRECT_URI
    );

    // TODO: put getAccessToken into this one function.
    // TODO: remove readline. just console log the url to get authenticated
    // TODO: use env file instead of token.json file
    // TODO: then remove fs require at top of this file
    // TODO: export this authorise function as default function. To use in your apis.

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
};

const getAccessToken = (oAuth2Client, callback) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [process.env.GCAL_SCOPE]
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Enter the code from that page here: ", code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
};

const listEvents = auth => {
    const calendar = google.calendar({ version: "v3", auth });
    calendar.events.list(
        {
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime"
        },
        (err, res) => {
            if (err) return console.log("The API returned an error: " + err);
            const events = res.data.items;
            if (events.length) {
                console.log("Upcoming 10 events:");
                events.map((event, i) => {
                    const start = event.start.dateTime || event.start.date;
                    console.log(`${start} - ${event.summary}`);
                });
            } else {
                console.log("No upcoming events found.");
            }
        }
    );
};

export const listEvents2 = () => authorize(listEvents);
