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
            reduxDebugMode: true,
            api: "http://localhost:3000/api/"
        }
    }
};
