import AstalHyprland from "gi://AstalHyprland"

const hyprland = AstalHyprland.get_default()

const dispatch = (ws: number) => hyprland.message_async(`dispatch workspace ${ws}`, null);


const Workspaces = () => {
    return <box
        className="Workspaces Widget"
        spacing={5}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(i => <button
            className="Workspace"
            label={String(i)} 
            setup={self => self.hook(hyprland, "event", () => {
                self.toggleClassName("active", hyprland.get_focused_workspace().get_id() === i)
                self.toggleClassName("occupied", (hyprland.get_workspace(i)?.get_clients().length || 0) > 0)
            })}
            onClick={() => dispatch(i)} />
        )}
    </box>
}

export default Workspaces
