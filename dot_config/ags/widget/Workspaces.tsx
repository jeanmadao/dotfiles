import AstalHyprland from "gi://AstalHyprland"

const hyprland = AstalHyprland.get_default()

const dispatch = (ws: number) => hyprland.message_async(`dispatch workspace ${ws}`, null);

const workspaces_names = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]


const Workspaces = () => {
    return <box
        className="Workspaces Widget"
        spacing={5}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(i => <button
            className="Workspace"
            label={workspaces_names[i-1]} 
            setup={self => self.hook(hyprland, "event", (_, event, args) => {
                self.toggleClassName("active", hyprland.get_focused_workspace().get_id() === i)
                self.toggleClassName("occupied", (hyprland.get_workspace(i)?.get_clients().length || 0) > 0)
            })}
            onClick={() => dispatch(i)} />
        )}
    </box>
}

export default Workspaces
