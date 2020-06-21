import material from "@rebass/preset-material";
import merge from "deepmerge";

const custom = {
    colors: {
        text: "#3c4043",
        background: "#fff",
        primary: "#1a73e8",
        secondary: "#039BE5",
        none: "none",
        modes: {
            sending: {},
            success: {},
            failure: {}
        }
    },
    radii: {
        card: 8
    },
    text: {
        h1: {
            color: "primary",
            fontWeight: "bold",
            fontSize: 5
        },
        h2: {
            fontSize: 4,
            fontWeight: "bold",
            color: "text",
            my: 2,
            mb: 3
        },
        card_create: {
            fontWeight: "bold",
            fontSize: 4,
            my: 2
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
            "cursor": "pointer",
            "&:hover": {
                bg: "muted"
            },
            "transition": ".3s"
        },
        outline: {
            cursor: "pointer",
            bg: "white"
        },
        link: {
            "cursor": "pointer",
            "color": "primary",
            "bg": "none",
            "&:hover": {
                bg: "muted"
            },
            "transition": ".3s"
        },
        cardOutline: {
            ...material.buttons.outline,
            cursor: "pointer",
            color: "white",
            bg: "none",
            borderColor: "white"
        },
        cardLink: {
            cursor: "pointer",
            color: "white",
            bg: "none"
        }
    },
    styles: {
        root: {
            maxWidth: ["auto", 1000],
            mx: "auto",
            px: 3,
            py: 4,
            color: "text"
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
