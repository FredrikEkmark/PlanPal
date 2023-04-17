import Link from "next/link"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

const TaskBoxCard = (props: Props) => {
  return (
    <div
      className={`${props.className} p-[5%] w-full bg-ourcolors-offWhite rounded-t-[30px]`}
    >
      {props.children}
    </div>
  )
}

export default TaskBoxCard
