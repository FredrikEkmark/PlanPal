import Image from "next/image"
import { ReactNode } from "react"

interface Props {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const AddTaskButton = (props: Props) => {
  return (
    <button
      className={` @apply fixed bottom-[100px] mr-[5%] right-0 bg-ourcolors-green h-[66px] w-[66px] flex justify-center items-center rounded-full ${props.className}`}
      onClick={props.onClick}
    >
      <Image
        className="absolut"
        src={"/plusWhite.svg"}
        alt={"#"}
        width={"21"}
        height={"21"}
      ></Image>
    </button>
  )
}

export default AddTaskButton
