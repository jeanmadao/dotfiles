import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Workspaces from "./workspaces.js"

const Start = (vertical) => Widget.Box({
    hpack: vertical ? "center" : "start",
    vpack: vertical ? "start" : "center",
    children: [
        Widget.Label("Start"),
    ],
})

const Center = (vertical) => Widget.Box({
    hpack: "center",
    vpack: "center",
    children: [
        Workspaces(),
    ],
})

const End = (vertical) => Widget.Box({
    hpack: vertical ? "center" : "end",
    vpack: vertical ? "end" : "center",
    children: [
        Widget.Label("End"),
    ],
})

const Bar = (vertical) => Widget.CenterBox({
    className: `bar ${vertical ? "vertical": "horizontal"}`,
    vertical,
    start_widget: Start(vertical),
    center_widget: Center(vertical),
    end_widget: End(vertical),
})

const BarWindow = (monitor, vertical) => Widget.Window({
    name: `bar${monitor}`,
    anchor: vertical ? ["right", "top", "bottom"] : ["top", "left", "right"],
    exclusivity: "exclusive",
    layer: "top",
    monitor,
    child: Bar(vertical),
});

export default BarWindow
