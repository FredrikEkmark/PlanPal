import { NextPage } from "next"
import Calendar from "react-calendar"
import { useEffect, useState } from "react"

interface Props {
  date: Date
  onClickDay: (date: Date) => void
}

const CalendarCard: NextPage<Props> = ({ onClickDay, date }: Props) => {
  useEffect(() => {
    console.log(date)
  }, [date])

  return (
    <>
      <div className={`w-full h-[40%] bg-ourcolors-blue`}>
        <div className="uppercase">
          <div className="text-center">
            <Calendar onClickDay={onClickDay} value={date} />
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
