import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';

const Player = (vertical) => Widget.Box({
    className: "player",
    vertical: true,
    children: [
        Widget.Label({
            hpack: "start",
        }),
        Widget.Label({
            hpack: "start",
        })
    ],
    setup: self => self.hook(Mpris, self => {
        const player = Mpris.getPlayer("spotify")
        if (player) {
            if (!vertical) {
                self.children[0].label = `${player.trackTitle}`
                if (player.trackArtists) {
                    self.children[1].label = `${player.trackArtists.join(", ")}`
                }
            }
        } else {
            self.children[0].label = ""
            self.children[1].label = ""
        }
    })
})

export default Player
