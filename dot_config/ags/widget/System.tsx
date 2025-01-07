import { bind, Variable,  } from "astal"
import { Gtk } from "astal/gtk3"
import Battery from "gi://AstalBattery"
import Wp from "gi://AstalWp"

const AudioWidget = () => {
    const audio = Wp.get_default()?.audio
    const defaultSpeaker = audio?.defaultSpeaker

    if (!defaultSpeaker) return <box />

    return <box
        className="Sysinfo Audio"
        spacing={5}
        valign={Gtk.Align.CENTER}
    >
        <icon
            icon={bind(defaultSpeaker, "volume_icon").as(icon_name => icon_name)}
        />
        <label
            label={bind(defaultSpeaker, "volume").as(volume => `${Math.round(volume * 100)}%`)}
        />
    </box>
}

const BatteryWidget = () => {
    const battery = Battery.get_default()

    return <box
        className="Sysinfo Battery"
        spacing={5}
        valign={Gtk.Align.CENTER}
        visible={battery.get_is_present()}
    >
        <icon
            icon={bind(battery, "battery_icon_name").as(icon_name => icon_name)}
        />
        <label
            label={bind(battery, "percentage").as(percentage => `${Math.round(percentage * 100)}%`)}
        />
    </box>
}

const System = () => {
    return <box
        className="System Widget"
        >
        <AudioWidget />
        <BatteryWidget />
    </box>
}

export default System
