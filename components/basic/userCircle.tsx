import { NextPage } from "next"

interface Props {
  username: string
  large?: boolean
  color?: string
}

const UserCircle = ({ username, large, color }: Props) => {
  let bgColor = "bg-ourcolors-blue"
  let text = "text-ourcolors-white"
  let circleSize = `h-8 w-8`
  let textSize = `text-hs`

  if (color) {
    bgColor = "bg-ourcolors-" + color
    text = "text-ourcolors-blue"
  }

  if (large) {
    circleSize = `h-32 w-32`
    textSize = `text-pl `
  }

  return (
    <div
      className={` ${circleSize} flex justify-center font-bold items-center ${text} ${textSize} rounded-full ${bgColor}`}
    >
      {username.charAt(0).toUpperCase()}
    </div>
  )
}

export default UserCircle
