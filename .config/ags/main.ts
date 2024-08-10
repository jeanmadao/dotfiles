import "style/style"
import { forMonitors } from "lib/utils"
import Bar from "widget/bar/Bar"
import Launcher from "widget/launcher/Launcher"

App.config({
    windows: [
        ...forMonitors(Bar),
        //Launcher()
    ],
})
