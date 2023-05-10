import Image from "next/image"
import { useState } from "react"

interface Props {
  username: string | null | undefined
}

const DashboardWelcome = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="">
        <p className="w-[90%] mx-[5%] text-bl mb-1">Welcome,</p>
        <p className="w-[90%] mx-[5%] text-hm mb-5">{props.username}</p>
      </div>
    </div>
  )
}

export default DashboardWelcome
