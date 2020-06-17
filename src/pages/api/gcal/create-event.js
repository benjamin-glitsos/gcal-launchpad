import { google } from "googleapis";

const allDayEvent = date => {
    const day = { date, timeZone: process.env.settings.timeZone };
    return { start: day, end: day };
};

const auth = (() => {
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
})();

export default async (req, res) => {
    if (!process.env.TEST_MODE) {
        const {
            query: { title, date }
        } = req;
        try {
            const calendar = google.calendar({ version: "v3", auth });
            const query = await calendar.events.insert({
                auth,
                calendarId: process.env.GCAL_CALENDAR_ID,
                resource: {
                    summary: title,
                    ...allDayEvent(date)
                }
            });
            res.status(200).json(query);
        } catch (err) {
            console.error(err);
            res.status(500).end();
        }
    } else {
        res.status(200).end();
    }
};
