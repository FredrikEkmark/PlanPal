import { Calendar } from "@/types/calendar"
import { NextPage } from "next"
import Link from "next/link"

interface Props {
  calendar: Calendar
}

const DashboardCalendar: NextPage<Props> = ({ calendar }: Props) => {
  const date = new Date()

  const todaysActivities = calendar.activites.filter(
    (activity) => activity.date === (date.toISOString().slice(0, 10) as string)
  )

  const sortedActivities = todaysActivities.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime)
  })

  const todaysSlides = sortedActivities.map((activity, index) => (
    <div key={"slide" + index} id={"slide" + index}>
      <p className="ml-2 text-hxs">
        {activity.startTime} - {activity.endTime}
      </p>
      <p className="ml-2 mt-7 text-hm">{activity.name}</p>
      <p className="ml-2 text-hxs">{activity.description}</p>
    </div>
  ))

  return (
    <>
      <div className="mx-[5%] flex justify-between items-center">
        <p className="mb-2 text-hm">Calendar</p>
        <Link className="text-ourcolors-purple text-hxs" href={"/calendar"}>
          See full
        </Link>
      </div>

      <div className="slides">{todaysSlides}</div>
    </>
  )
}

export default DashboardCalendar
