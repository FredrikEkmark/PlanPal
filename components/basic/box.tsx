import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

const Box = (props: Props) => {
  return (
    <div
      className={` py-2 px-4 mx-[5%] my-3 w-[90%] bg-white border-solid border-slate-300 border-[1px] rounded-[10px] inset[0%] mb-[15px] ${props.className}`}
    >
      {props.children}
    </div>
  )
}

export default Box
