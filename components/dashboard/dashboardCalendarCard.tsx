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
        <p className="font-medium text-hm">Calendar</p>
        <p className="font-semibold text-hxs text-ourcolors-purple"></p>
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
