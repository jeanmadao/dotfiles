import Gdk from 'gi://Gtk'
import Gdk from 'gi://Gdk'

export const forMonitors = (widget: (monitor: number) => Gtk.Window) => {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1
    return range(n, 0).flatMap(widget)
}

export function range(length: number, start = 1) {
    return Array.from({ length }, (_, i) => i + start)
}
