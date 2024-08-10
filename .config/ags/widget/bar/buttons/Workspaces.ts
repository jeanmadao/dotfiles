const hyprland = await Service.import('hyprland')

const dispatch = (ws: number) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = () => Widget.Box({
    class_name: "workspaces",
    spacing: 5,
    children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
	class_name: "button inactive",
	attribute: i,
	label: `${i}`,
	onClicked: () => dispatch(i),
    })),

    //remove this setup hook if you want fixed number of buttons
    setup: self => self.hook(hyprland, () => { 
	const focused_workspaces = hyprland.monitors.map((monitor) => monitor.activeWorkspace.id)
	self.children.forEach(btn => {
	    const active = hyprland.workspaces.some(ws => ws.id === btn.attribute)
	    const focus = focused_workspaces.includes(btn.attribute)
	    btn.class_name = `button ${active ? "active" : ""} ${focus ? "focus" : ""}`
	}
    )}),
})

export default Workspaces
