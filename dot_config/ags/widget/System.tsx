import { bind,  } from "astal"
import { Gtk } from "astal/gtk3"
import Battery from "gi://AstalBattery"


const BatteryWidget = () => {
    const battery = Battery.get_default()

    return <box
        className="Sysinfo Battery"
        spacing={5}
        valign={Gtk.Align.CENTER}
        visible={battery.get_is_present()}
    >
        <icon
            icon={bind(battery, "battery_icon_name").as(icon_name => `${icon_name}`)}
        />
        <label
            label={bind(battery, "percentage").as(percentage => `${percentage * 100}%`)}
        />
    </box>
}

const System = () => {
    return <box
        className="System Widget"
        >
        <BatteryWidget />
    </box>
}

export default System
