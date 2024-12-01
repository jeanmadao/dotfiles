import AstalHyprland from "gi://AstalHyprland"

const hyprland = AstalHyprland.get_default()

const dispatch = (ws: number) => hyprland.message_async(`dispatch workspace ${ws}`, null);

const workspaces_names = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]


const Workspaces = () => {
    return <box
        className="Workspaces Widget"
        spacing={5}
        setup={self=> self.hook(hyprland, "event", () => {
            const focused_id = hyprland.get_focused_workspace().get_id()
            const workspaces_id = hyprland.get_workspaces().map(ws => ws.get_id())
            self.children.forEach((btn, i) => {
                btn.toggleClassName("active", i + 1 === focused_id)
                btn.toggleClassName("occupied", workspaces_id.includes(i + 1))
            })
        })}>

        {Array.from({ length: 10 }, (_, i) => i + 1).map(i => <button
            className="Workspace"
            label={workspaces_names[i-1]} 
            onClick={() => dispatch(i)} />
        )}
    </box>
}

export default Workspaces
