import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Datetime from "./datetime.js"

const System = (vertical) => Widget.Box({
    children: [
        Datetime(vertical),
    ],
})

export default System
