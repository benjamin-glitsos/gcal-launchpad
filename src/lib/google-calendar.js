import { google } from "googleapis";

export default function auth() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GCAL_CREDENTIALS_CLIENT_ID,
        process.env.GCAL_CREDENTIALS_CLIENT_SECRET,
        process.env.GCAL_CREDENTIALS_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
        process.env.GCAL_TOKEN_ACCESS_TOKEN,
        process.env.GCAL_TOKEN_REFRESH_TOKEN,
        process.env.GCAL_TOKEN_SCOPE,
        process.env.GCAL_TOKEN_TOKEN_TYPE,
        process.env.GCAL_TOKEN_EXPIRY_DATE
    });

    return oAuth2Client;
}
