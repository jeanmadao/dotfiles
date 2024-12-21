import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import Workspaces from "./Workspaces"
import Datetime from "./Datetime"
import System from "./System"

const StartWidget = () => {
    return <box
        className="StartWidget"
        spacing={10}
        halign={Gtk.Align.START}
    >
    </box>
}

const CenterWidget = () => {
    return <box
        className="CenterWidget"
        spacing={10}
    >
        <Workspaces />
    </box>
}

const EndWidget = () => {
    return <box
        className="EndWidget"
        spacing={10}
        halign={Gtk.Align.END}
    >
        <System />
        <Datetime />
    </box>
}

const CenterBox = () => {
    return <centerbox
        className="CenterBox"
        vertical={false}
        startWidget={<StartWidget />}
        centerWidget={<CenterWidget />}
        endWidget={<EndWidget />}
    />
}

const Bar = (gdkmonitor: Gdk.Monitor) => {
    return <window
        className="Bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        application={App}>
        <CenterBox />
    </window>
}

export default Bar
