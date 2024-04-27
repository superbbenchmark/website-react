import { blueGrey, grey, red, orange, green } from "@material-ui/core/colors";
import update from "immutability-helper";

const mainTheme = {
    palette: {
        primary: {
            main: '#ffffff',
        },
        text: {
            primary: blueGrey[600],
            secondary: grey[600],
        },
    },
};

const constrainedTheme = update(mainTheme, {
    palette: {
        primary: {
            main: { $set: red[400] },
        },
    },
});

const lessConstrainedTheme = update(mainTheme, {
    palette: {
        primary: {
            main: { $set: orange[400] },
        },
    },
});

const unconstrainedTheme = update(mainTheme, {
    palette: {
        primary: {
            main: { $set: green[400] },
        },
    },
});

const submitFormTheme = update(mainTheme, {
    palette: {
        primary: {
            main: { $set: blueGrey[600] },
        },
    },
});

export {
    mainTheme,
    constrainedTheme,
    lessConstrainedTheme,
    unconstrainedTheme,
    submitFormTheme,
};
