import { NextPage } from "next"
import Calendar from "react-calendar"
import { useEffect, useState } from "react"

interface Props {
  date: Date
  onClickDay: (date: Date) => void
}

const CalendarCard = ({ onClickDay, date }: Props) => {
  return (
    <>
      <div className={`w-full h-[40%] bg-ourcolors-blue`}>
        <div className="uppercase">
          <div className="text-center">
            <Calendar locale="en-GB" onClickDay={onClickDay} value={date} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarCard
