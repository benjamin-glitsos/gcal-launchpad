const webpack = require("webpack");
const path = require("path");
const { parsed: localEnv } = require("dotenv").config();

module.exports = {
    webpack(config, { isServer }) {
        config.resolve.alias["~"] = path.resolve(__dirname, "src");

        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

        if (!isServer) {
            config.node = {
                fs: "empty"
            };
        }

        return config;
    },
    env: {
        settings: {
            title: "Google Calendar Launchpad",
            reduxDebugMode: false,
            api: "http://localhost:3000/api/",
            symbols: {
                parser: {
                    TODAY: "t",
                    DAY: "d",
                    WEEK: "w",
                    MONTH: "m",
                    YEAR: "y"
                },
                review: {
                    EMPTY: "EMPTY",
                    EDITING: "EDITING",
                    REVIEW: "REVIEW",
                    SENDING: "SENDING",
                    SEND_SUCCESS: "SEND_SUCCESS",
                    SEND_FAILURE: "SEND_FAILURE"
                }
            }
        }
    }
};
