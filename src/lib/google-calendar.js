import { google } from "googleapis";

export default function auth() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GCAL_CREDENTIALS_CLIENT_ID,
        process.env.GCAL_CREDENTIALS_CLIENT_SECRET,
        process.env.GCAL_CREDENTIALS_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
        access_token: process.env.GCAL_TOKEN_ACCESS_TOKEN,
        refresh_token: process.env.GCAL_TOKEN_REFRESH_TOKEN,
        scope: process.env.GCAL_TOKEN_SCOPE,
        token_type: process.env.GCAL_TOKEN_TOKEN_TYPE,
        expiry_date: process.env.GCAL_TOKEN_EXPIRY_DATE
    });

    return oAuth2Client;
}

export const listEvents = () => {
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
