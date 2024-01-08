import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Workspaces from "./workspaces.js"
import Player from "./player.js"
import System from "./system.js"

const Start = (vertical) => Widget.Box({
    hpack: vertical ? "center" : "start",
    vpack: vertical ? "start" : "center",
    children: [
        Player(vertical),
    ],
})

const Center = (monitor, vertical) => Widget.Box({
    hpack: "center",
    vpack: "center",
    children: [
        Workspaces(monitor, vertical),
    ],
})

const End = (vertical) => Widget.Box({
    hpack: vertical ? "center" : "end",
    vpack: vertical ? "end" : "center",
    children: [
        System(vertical),
    ],
})

const Bar = (monitor, vertical) => Widget.CenterBox({
    className: `bar ${vertical ? "vertical": "horizontal"}`,
    vertical,
    start_widget: Start(vertical),
    center_widget: Center(monitor, vertical),
    end_widget: End(vertical),
})

const BarWindow = (monitor, vertical) => Widget.Window({
    name: `bar${monitor}`,
    anchor: vertical ? ["right", "top", "bottom"] : ["top", "left", "right"],
    exclusivity: "exclusive",
    layer: "top",
    monitor,
    child: Bar(monitor, vertical),
});

export default BarWindow
