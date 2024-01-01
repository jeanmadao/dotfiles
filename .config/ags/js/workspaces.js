import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";

const focusedTitle = Widget.Label({
    label: Hyprland.active.client.bind("title"),
    visible: Hyprland.active.client.bind("address")
        .transform(addr => !!addr),
});

const dispatch = ws => Hyprland.sendMessage(`dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    child: Widget.Box({
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            attribute: i,
            label: `${i}`,
            onClicked: () => dispatch(i),
        })),

        // remove this setup hook if you want fixed number of buttons
        setup: self => self.hook(Hyprland, box => box.children.forEach(btn => {
            btn.visible = Hyprland.workspaces.some(ws => ws.id === btn.attribute);
        })),
    }),
});

export default Workspaces
