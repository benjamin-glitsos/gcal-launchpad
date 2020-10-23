import material from "@rebass/preset-material";
import merge from "deepmerge";

const custom = {
    colors: {
        text: "#3c4043",
        background: "#fff",
        glass: "rgb(212, 212, 212, 0.15)",
        primary: "#1a73e8",
        secondary: "#1967d2",
        yellow: "#F6BF26",
        green: "#0B8043",
        purple: "#7F39FB",
        red: "#EA4335",
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
        h3: {
            fontSize: 3,
            fontWeight: "bold",
            color: "text",
            my: 2,
            mb: 3
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
    card: {
        create: {
            backgroundColor: "primary",
            color: "white"
        }
    },
    buttons: {
        primary: {
            "cursor": "pointer",
            "&:hover": {
                bg: "secondary"
            }
        },
        secondary: {
            "cursor": "pointer",
            "&:hover": {
                bg: "glass"
            },
            "transition": ".3s"
        },
        outline: {
            "cursor": "pointer",
            "bg": "white",
            "transition": ".3s",
            "&:hover": {
                bg: "glass"
            }
        },
        link: {
            "cursor": "pointer",
            "color": "primary",
            "bg": "none",
            "&:hover": {
                bg: "glass"
            },
            "transition": ".3s"
        },
        cardOutline: {
            ...material.buttons.outline,
            "cursor": "pointer",
            "color": "white",
            "bg": "none",
            "borderColor": "white",
            "&:hover": {
                bg: "glass"
            }
        },
        cardLink: {
            "cursor": "pointer",
            "color": "white",
            "bg": "none",
            "&:hover": {
                bg: "glass"
            }
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
