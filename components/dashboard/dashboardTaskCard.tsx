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
      </Box>
    </div>
  )
}

export default DashboardTaskCard
