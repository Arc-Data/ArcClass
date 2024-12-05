import dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"

dayjs.extend(RelativeTime)
dayjs.extend(utc)

export const getDeadline = (submissionDate) => {
    return dayjs(submissionDate).fromNow()
}


export default dayjs;