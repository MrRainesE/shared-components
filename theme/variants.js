import { grey } from "@mui/material/colors";
import { colorGreen, colorRed, mainColor, secondaryColor } from "../constants";


const evoitVariant = {
    name: "Light",
    palette: {
        primary: {
            main: mainColor,
            selected:mainColorSelected,
            contrastText: "#FFFFFF",
        },
        main: {
            main: mainColor,
            selected:mainColorSelected,
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: secondaryColor,
            contrastText: "#FFFFFF",
        },
        warning: {
            main: colorOrange,
            contrastText: "#FFFFFF",
        },
        orange: {
            main: colorOrange,
            contrastText: "#FFFFFF",
        },
        yellow: {
            main: colorYellow,
            contrastText: "#FFFFFF",
        },
        purple: {
            main: colorPurple,
            contrastText: "#FFFFFF",
        },
        succes: {
            main: colorGreen,
            contrastText: "#FFFFFF",
        },
        green: {
            main: colorGreen,
            contrastText: "#FFFFFF",
        },
        error: {
            main: colorRed,
            contrastText: "#FFFFFF",
        },
        red: {
            main: colorRed,
            contrastText: "#FFFFFF",
        },
        info: {
            main: "#64b5f6",
            contrastText: "#FFFFFF",
        },
        disabled: {
            main: disabledColor,
            contrastText: "#FFFFFF",
        },
    },
    header: {
        color: "#565d64",
        background: "#FFFFFF",
        search: {
            color: mainColor,
        },
        indicator: {
            background: mainColor,
        },
    },
    sidebar: {
        color: "#FFFFFF",
        background: mainColor,

        header: {
            color: grey[200],
            background: mainColor,
            brand: {
                color: "#FFFFFF",
            },
        },
        footer: {
            color: grey[200],
            background: mainColor,
            online: {
                background: colorGreen,
            },
        },
        category: {
            fontWeight: 500,
        },
        badge: {
            color: "#FFFFFF",
            background: "#FFFFFF",
        },
    },
    body: {
        background: "#e8e8e8",
    },
};

const variants = [evoitVariant];

export default variants;
