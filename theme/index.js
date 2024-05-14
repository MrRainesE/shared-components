import { createTheme } from "@mui/material/styles";

import breakpoints from "theme/breakpoints";
import overrides from "theme/overrides";
import props from "theme/props";
import shadows from "theme/shadows";
import typography from "theme/typography";
import variants from "theme/variants";

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
