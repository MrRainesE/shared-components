import { colorYellow } from "../constants";

const overrides = {
    MuiCardHeader: {
        action: {
            marginTop: "-4px",
            marginRight: "-4px",
        },
    },
    MuiPickersDay: {
        day: {
            fontWeight: "300",
        },
    },
    MuiPickersYear: {
        root: {
            height: "64px",
        },
    },
    MuiPickersCalendar: {
        transitionContainer: {
            marginTop: "6px",
        },
    },
    MuiPickersCalendarHeader: {
        iconButton: {
            backgroundColor: "transparent",
            "& > *": {
                backgroundColor: "transparent",
            },
        },
        switchHeader: {
            marginTop: "2px",
            marginBottom: "4px",
        },
    },
    MuiPickersClock: {
        container: {
            margin: `32px 0 4px`,
        },
    },
    MuiPickersClockNumber: {
        clockNumber: {
            left: `calc(50% - 16px)`,
            width: "32px",
            height: "32px",
        },
    },
    MuiPickerDTHeader: {
        dateHeader: {
            "& h4": {
                fontSize: "2.125rem",
                fontWeight: 400,
            },
        },
        timeHeader: {
            "& h3": {
                fontSize: "3rem",
                fontWeight: 400,
            },
        },
    },
    MuiPickersTimePicker: {
        hourMinuteLabel: {
            "& h2": {
                fontSize: "3.75rem",
                fontWeight: 300,
            },
        },
    },
    MuiPickersToolbar: {
        toolbar: {
            "& h4": {
                fontSize: "2.125rem",
                fontWeight: 400,
            },
        },
    },
    MuiTableRow: {
        root: {
            "&$selected": {
                backgroundColor: "yellow",
            },
        },
    },
    MuiCssBaseline: {
        "@global": {
            "*::-webkit-scrollbar": {
                width: "7px",
                height: "7px",
            },
            "*::-webkit-scrollbar-track": {
                //background: 'inherit',
                //boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: colorYellow,
                borderRadius: "20px",
                border: "inherit",
            },
            "*::-webkit-scrollbar-corner": {
                background: "inherit",
            },
        },
    },
};

export default overrides;
