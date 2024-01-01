import App from "resource:///com/github/Aylur/ags/app.js"
import * as Utils from "resource:///com/github/Aylur/ags/utils.js"
import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Bar from "./js/bar.js"
import ScreenCorners from "./js/screencorners.js"

const scss = `${App.configDir}/scss/main.scss`
const css = `${App.configDir}/style.css`
Utils.exec(`sassc ${scss} ${css}`)

export default {
    style: css,
    windows: [
        Bar(1, false),
        Bar(0, true),
        ...ScreenCorners(1),
        ...ScreenCorners(0),
    ]
};
