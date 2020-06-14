export default {
    breakpoints: ["0", "1000px"],
    colors: {
        text: "#3c4043",
        background: "#fff",
        primary: "#1a73e8",
        modes: {
            sending: {},
            success: {},
            failure: {}
        }
    },
    fonts: (() => {
        const fonts = "Google Sans, Roboto, Arial, sans-serif";
        return { body: fonts, heading: fonts };
    })(),
    lineHeights: {
        body: 1.5,
        heading: 1.25
    },
    radii: {
        default: 4
    },
    shadows: {
        card: "0 0 4px rgba(0, 0, 0, .125)"
    },
    text: {
        heading: {
            color: "primary"
        },
        mainHeading: {
            color: "primary"
        }
    },
    buttons: {
        primary: {
            fontWeight: "bold",
            color: "background",
            bg: "primary",
            borderRadius: "default",
            px: 3
        }
    },
    forms: {
        mainInput: {
            fontSize: 3,
            px: 3,
            py: 2,
            my: 4
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
