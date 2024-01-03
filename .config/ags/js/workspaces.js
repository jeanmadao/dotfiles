import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";

/*
const focusedTitle = Widget.Label({
    label: Hyprland.active.client.bind("title"),
    visible: Hyprland.active.client.bind("address")
        .transform(addr => !!addr),
});
*/

const dispatch = ws => Hyprland.sendMessage(`dispatch workspace ${ws}`);

const Workspaces = (monitor, vertical) => Widget.EventBox({
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    child: Widget.Box({
        className: "workspaces",
        spacing: 5,
        vertical,
        children: Array.from({ length: 5 }, (_, i) => monitor === 1 ? i + 1 : i + 6)
            .map(i => Widget.Button({
                attribute: i,
                label: `${i}`,
                onClicked: () => dispatch(i),
            })),
        // remove this setup hook if you want fixed number of buttons
        setup: self => self.hook(Hyprland, box => box.children.forEach(btn => {
            if (Hyprland.monitors.some(m => m.activeWorkspace.id === btn.attribute)) {
                btn.className = "workspace-entry button current"
            } else if (Hyprland.workspaces.some(ws => ws.id === btn.attribute)) {
                btn.className = "workspace-entry button active"
            } else {
                btn.className = "workspace-entry button"
            }
        })),
    }),
});

export default Workspaces
