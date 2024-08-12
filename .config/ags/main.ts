import "style/style"
import { forMonitors } from "lib/utils"
import Bar from "widget/bar/Bar"

App.config({
    windows: [
        ...forMonitors(Bar),
    ],
})
