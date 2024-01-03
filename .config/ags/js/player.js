import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';

const Player = (vertical) => Widget.Box({
    className: "player",
    children: [
        Widget.Box({
            className: "album-cover",
            css: ".album-cover { background-image: url('/home/feilong/.config/ags/assets/default-cover.png') }",
            children: [
                Widget.Button({
                    className: "player-btn",
                    child: Widget.Icon({
                        className: "player-icon",
                        size: 20,
                    })
                })
            ]
        }),
        !vertical && Widget.Box({
            className: "track-info",
            vertical: true,
            vpack: "center",
            children: [
                Widget.Label({
                    hpack: "start",
                    label: "Have a nice day"

                }),
                Widget.Label({
                    hpack: "start",
                    label: "Feilong !"
                })
            ]
        })
    ],
    setup: self => self.hook(Mpris, self => {
        const player = Mpris.getPlayer("spotify")

        const boxCover = self.children[0]
        const playButton = boxCover.children[0]
        const playIcon = playButton.child
        playButton.onClicked = () => player.playPause()


        if (player) {
            if (player.playBackStatus === "Playing") {
                playIcon.icon= "media-playback-pause-symbolic"
                self.className = "player playing"
            } else if (player.playBackStatus === "Paused") {
                playIcon.icon= "media-playback-start-symbolic"
                self.className = "player paused"
            }
            if (player.coverPath) {
                boxCover.css = `.album-cover { background-image: url("${player.coverPath}") }`
            }
            if (!vertical) {
                const [trackLabel, artistLabel] = self.children[1].children
                trackLabel.label = `${player.trackTitle}`
                if (player.trackArtists) {
                    artistLabel.label = `${player.trackArtists.join(", ")}`
                }
            }
        } else {
            if (!vertical) {
                const [trackLabel, artistLabel] = self.children[1].children
                trackLabel.label = "Have a nice day"
                artistLabel.label = "Feilong!"
            }
            self.className = "player"
            boxCover.css = ".album-cover { background-image: url('/home/feilong/.config/ags/assets/default-cover.png') }"

        }
    })
})

export default Player
