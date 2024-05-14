import { createTheme } from "@mui/material/styles";

import breakpoints from "./breakpoints";
import overrides from "./overrides";
import props from "./props";
import shadows from "./shadows";
import typography from "./typography";
import variants from "./variants";

const theme = (variant) => {
    return createTheme(
        {
            spacing: 4,
            breakpoints: breakpoints,
            overrides: overrides,
            props: props,
            typography: typography,
            shadows: shadows,
            body: variant.body,
            header: variant.header,
            palette: variant.palette,
            sidebar: variant.sidebar,
        },
        variant.name,
    );
};

const themes = theme(variants[0]);

export default themes;
