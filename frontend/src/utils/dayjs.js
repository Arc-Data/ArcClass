import dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(RelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export const getDeadline = (submissionDate) => {
    return dayjs.utc(submissionDate).fromNow()
}


export default dayjs;