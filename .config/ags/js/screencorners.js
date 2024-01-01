import Widget from "resource:///com/github/Aylur/ags/widget.js"
import RoundedCorner from "./roundedcorner.js"

const Corner = (vertical, horizontal, monitor) => Widget.Window({
    monitor,
    name: `corner-${vertical}${horizontal}-${monitor}`,
    layer: "top",
    anchor: [vertical, horizontal],
    exclusivity: "exclusive",
    visible: true,
    child: RoundedCorner(`${vertical}${horizontal}`),
})

const ScreenCorners = (monitor) => [
    Corner("top", "left", monitor),
    Corner("top", "right", monitor),
    Corner("bottom", "left", monitor),
    Corner("bottom", "right", monitor)
]

export default ScreenCorners
