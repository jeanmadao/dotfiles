import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const time = Variable('', {
    poll: [60000, 'date +%R'],
});

const Datetime = (vertical) => Widget.Box({
    className: "datetime",
    children: [
        Widget.Label({
            className: "datetime hour",
        }).bind('label', time),
    ]
})

export default Datetime
