import Workspaces from "widget/bar/buttons/Workspaces"
import Datetime from "widget/bar/buttons/Datetime"

const start = () => Widget.Box({
    className: 'bar-start',
    hpack: "start",
    children: [ ],
})

const center = () => Widget.Box({
    children: [
	Workspaces(),
    ],
})

const end = () => Widget.Box({
    className: 'bar-end',
    hpack: "end",
    children: [
	Datetime()
    ],
})

const centerBox = () => Widget.CenterBox({
    className: 'bar',
    vertical: false,
    startWidget: start(),
    centerWidget: center(),
    endWidget: end(),
})

const Bar = (monitor: number) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: centerBox(),
})

export default Bar
