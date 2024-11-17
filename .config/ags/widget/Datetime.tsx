import { Variable } from "astal"

const time = Variable("").poll(1000, "date '+%a, %d %b %y | %T'")

const Datetime = () => {
    return <box
        className="Datetime Widget">
        <label label={time()} />
    </box>
}

export default Datetime
