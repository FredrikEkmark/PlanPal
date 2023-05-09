import Image from "next/image"
import { useState } from "react"

interface Props {
  username: string
}

const DashboardWelcome = (props: Props) => {
  return (
    <div className="flex flex-col py-[5%]">
      <div className="mt-4">
        <p className="w-[90%] mx-[5%]  -mb-2">Welcome,</p>
        <p className="w-[90%] mx-[5%] text-hm font-semibold mb-5">
          {props.username}
        </p>
      </div>
    </div>
  )
}

export default DashboardWelcome
