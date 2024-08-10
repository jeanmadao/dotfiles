const date = Variable('', {
    poll: [1000, 'date +%T'],
})

const Datetime = () => Widget.Box({
    class_name: 'datetime',
    child: Widget.Label({ label: date.bind() })
})

export default Datetime
