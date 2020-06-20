const webpack = require("webpack");
const withMDX = require("@next/mdx");
const path = require("path");
const { parsed: localEnv } = require("dotenv").config();
const externalLinks = require("remark-external-links");

module.exports = withMDX({
    options: {
        remarkPlugins: [externalLinks, { rel: false }]
    }
})({
    webpack(config, { isServer }) {
        config.resolve.alias["~"] = path.resolve(__dirname, "src");

        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

        config.module.rules.push({
            test: /\.(js|jsx)$/,
            use: "webpack-import-glob-loader"
        });

        if (!isServer) {
            config.node = {
                ...config.node,
                fs: "empty",
                child_process: "empty",
                dns: "empty",
                net: "empty",
                tls: "empty"
            };
        }

        return config;
    },
    env: {
        settings: {
            title: "Google Calendar Launchpad",
            apiPath: [
                process.env.NODE_ENV === "production"
                    ? "https://cal.benglitsos.com.au"
                    : "http://localhost:3001",
                "api"
            ],
            googleCalendarUrl: "https://calendar.google.com/",
            deletionDelay: 3000,
            historyListLength: 10
        },
        messages: {
            EDITING: "EDITING",
            REVIEW: "REVIEW",
            REQUEST: "REQUEST",
            SUCCESS: "SUCCESS",
            FAILURE: "FAILURE"
        },
        parserSymbols: {
            TODAY: "t",
            DAY: "d",
            WEEK: "w",
            MONTH: "m",
            YEAR: "y"
        },
        cookies: {
            INFO_SHOW: "gcal_launchpad___info_show"
        }
    }
});
