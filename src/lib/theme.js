import material from "@rebass/preset-material";
import merge from "deepmerge";

const custom = {
    colors: {
        text: "#3c4043",
        background: "#fff",
        primary: "#1a73e8",
        none: "none",
        modes: {
            sending: {},
            success: {},
            failure: {}
        }
    },
    text: {
        h1: {
            color: "primary",
            fontWeight: "bold",
            fontSize: 4,
            py: 2
        },
        h2: {
            fontSize: 3
        }
    },
    forms: {
        mainInput: {
            color: "primary",
            fontWeight: "bold",
            fontSize: 3,
            px: 3,
            py: 2
        }
    },
    buttons: {
        primary: {
            cursor: "pointer"
        },
        secondary: {
            "cursor": "buttons.primary",
            "&:hover": {
                backgroundColor: "muted"
            },
            "transition": "background-color .3s"
        },
        outline: {
            cursor: "buttons.primary"
        },
        link: {
            "cursor": "buttons.primary",
            "color": "primary",
            "bg": "none",
            "&:hover": {
                backgroundColor: "muted"
            },
            "transition": "background-color .3s"
        }
    },
    styles: {
        root: {
            maxWidth: ["auto", 1000],
            mx: "auto",
            px: 3,
            py: 4
        }
    }
};

export default (() => {
    const overwriteMerge = (destinationArray, sourceArray, options) =>
        sourceArray;
    return merge.all([material, custom], {
        arrayMerge: overwriteMerge
    });
})();
