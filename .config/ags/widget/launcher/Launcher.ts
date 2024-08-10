const { query } = await Service.import("applications")
const WINDOW_NAME = "launcher"

const AppItem = app => Widget.Button({
    on_clicked: () => {
	App.closeWindow(WINDOW_NAME)
	app.launch()
    },
    attribute: { app },
    child: Widget.Box({
	children: [
	    Widget.Icon({
		icon: app.icon_name || "",
		size: 42,
	    }),
	    Widget.Label({
		class_name: "app-title",
		label: app.name,
		xalign: 0,
		vpack: "center",
		truncate: "end",
	    })
	]
    })
})

const launcherBox = ({ width = 500, height = 500, spacing = 12 }) => {
    let applications = query("").map(AppItem)

    const list = Widget.Box({
	vertical: true,
	children: applications,
	spacing,
    })

    const repopulate = () => {
	let applications = query("").map(AppItem)
	list.children = applications
    }

    const entry = Widget.Entry({
        hexpand: true,
        css: `margin-bottom: ${spacing}px;`,

        // to launch the first item on Enter
        on_accept: () => {
            // make sure we only consider visible (searched for) applications
	    const results = applications.filter((item) => item.visible);
            if (results[0]) {
                App.closeWindow(WINDOW_NAME)
                results[0].attribute.app.launch()
            }
        },

        // filter out the list
        on_change: ({ text }) => applications.forEach(item => {
            //console.log(item.attribute.app.match(text ?? ""))
	    console.log(item.attribute)
	    item.visible = false
            //item.visible = item.attribute.app.match(text ?? "")
	    //item.visible = false
        }),
    })

    return Widget.Box({
	vertical: true,
	children: [
	    entry,

	    // wrap the list in a scrollable
	    Widget.Scrollable({
		hscroll: "never",
		css: `min-width: ${width}px;`
		    + `min-height: ${height}px;`,
		child: list,
	    }),
	],
	setup: self => self.hook(App, (_, windowName, visible) => {
	    if (windowName !== WINDOW_NAME)
		return

	    // when the applauncher shows up
	    if (visible) {
		repopulate()
		entry.text = ""
		entry.grab_focus()
	    }
	}),
    })
}

const Launcher = (monitor: number) => Widget.Window({
    name: WINDOW_NAME,
    setup: self => self.keybind("Escape", () => {
	App.closeWindow(WINDOW_NAME)
    }),
    visible: false,
    keymode: "exclusive",
    child: launcherBox({})
})

export default Launcher
