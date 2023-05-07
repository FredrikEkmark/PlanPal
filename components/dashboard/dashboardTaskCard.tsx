import Image from "next/image"
import { useState } from "react"
import Box from "../basic/box"
import Link from "next/link"
import DisplayToDoCategory from "../toDo/displayToDoCategory"
import DashboardDisplayTodaysTask from "./dashboardDisplayTodaysTask"

interface Props {}

const DashboardTaskCard = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between w-[90%] mx-[5%]">
        <p className="text-hm font-medium">Todays tasks</p>
        <p className="text-hxs font-semibold text-ourcolors-purple">
          <Link href={"/toDo"}>view all</Link>
        </p>
      </div>

      <Box>
        <DashboardDisplayTodaysTask title={""} />
        {/* <label className="flex items-center space-x-2 text-hs">
          <input type="checkbox" className="form-checkbox" />
          <span className="text-gray-700">Text next to checkbox</span>
        </label>

        <label className="flex items-center space-x-2 text-hs">
          <input type="checkbox" className="form-checkbox" />
          <span className="text-gray-700">Text next to checkbox</span>
        </label>

        <label className="flex items-center space-x-2 text-hs">
          <input type="checkbox" className="form-checkbox" />
          <span className="text-gray-700">Text next to checkbox</span>
        </label> */}
      </Box>
    </div>
  )
}

export default DashboardTaskCard
