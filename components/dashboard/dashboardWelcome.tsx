import Image from "next/image"
import { useState } from "react"

interface Props {}

const dashboardWelcome = (props: Props) => {
  return (
    <div className="flex flex-col">
      <p className="w-[90%] mx-[5%] -mb-2">Welcome,</p>
      <p className="w-[90%] mx-[5%] text-hm font-semibold mb-5">Erik Jansson</p>
      {/* ta in namn från DB i den andra p taggen */}
    </div>
  )
}

export default dashboardWelcome
