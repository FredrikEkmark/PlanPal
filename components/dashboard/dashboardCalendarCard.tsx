import Image from "next/image"
import { useState } from "react"
import Box from "../basic/box"
import Link from "next/link"
import DisplayToDoCategory from "../toDo/displayToDoCategory"
import DashboardDisplayTodaysTask from "./dashboardDisplayTodaysTask"
import DashboardCalendarBox from "../basic/dashboardCalendarBox"

interface Props {}

const DashboardCalendarCard = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between w-[90%] mx-[5%]">
        <p className="text-hm font-medium">Calendar</p>
        <p className="text-hxs font-semibold text-ourcolors-purple">
          <Link href={"/calendar"}>see full</Link>
        </p>
      </div>

      <div className="flex justify-between">
        <DashboardCalendarBox>
          <div>
            <p className=" text-hxs">09.00 - 13.37</p>
            <br />
            <p className="flex justify-center text-hm">Tenta</p>
            <p className="flex justify-center text-bs">Super skoj</p>
            <br />
          </div>
        </DashboardCalendarBox>
        <DashboardCalendarBox>
          <div>
            <p className="text-hxs">09.00 - 13.37</p>
            <br />
            <p className="flex justify-center text-hm">Tenta</p>
            <p className="flex justify-center text-bs">Super skoj</p>
            <br />
          </div>
        </DashboardCalendarBox>
      </div>
    </div>
  )
}

export default DashboardCalendarCard
