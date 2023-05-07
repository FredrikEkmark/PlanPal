import { NextPage } from "next"
import Calendar from "react-calendar"
import { useState } from "react"

interface Props {}

const CalendarCard: NextPage<Props> = ({}) => {
  const [date, setDate] = useState<Date>(new Date())

  // går inte sätta in on Change i Calendar {setDate}

  return (
    <>
      <div className={`w-full h-full bg-ourcolors-blue`}>
        <div className="uppercase">
          <div className="text-center">
            <Calendar onClickDay={setDate} value={date} />
          </div>
          <p className="text-center text-white ">
            <span className="bold"></span> {date.toDateString()}
          </p>
        </div>
      </div>
    </>
  )
}

export default CalendarCard
