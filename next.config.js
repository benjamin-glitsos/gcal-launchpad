const webpack = require("webpack");
const path = require("path");
const { parsed: localEnv } = require("dotenv").config();

module.exports = {
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
            reduxDebugMode: true,
            timeZone: "Australia/Sydney",
            apiPath: [
                process.env.NODE_ENV === "production"
                    ? "https://cal.benglitsos.com.au"
                    : "http://localhost:3001",
                "api"
            ],
            deletionDelay: 3000,
            historyListLength: 10
        },
        messages: {
            EMPTY: "EMPTY",
            EDITING: "EDITING",
            REVIEW: "REVIEW",
            SEND: "SEND",
            SUCCESS: "SUCCESS",
            FAILURE: "FAILURE"
        },
        parserSymbols: {
            TODAY: "t",
            DAY: "d",
            WEEK: "w",
            MONTH: "m",
            YEAR: "y"
        }
    }
};
