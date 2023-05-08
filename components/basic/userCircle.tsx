import { NextPage } from "next"

interface Props {
  username: string
  size?: number
  color?: string
}

const UserCircle = ({ username, size, color }: Props) => {
  let diameter = 120
  let bgColor = "bg-ourcolors-blue"
  let textColor = "text-ourcolors-white"

  if (size) {
    diameter = size
  }

  if (color) {
    bgColor = "bg-ourcolors-" + color
    textColor = "text-ourcolors-blue"
  }

  function capitalizeFirstLetter(str: string): string {
    const firstLetter = str.charAt(0).toUpperCase()
    return firstLetter
  }

  const circleSize = `h-[${diameter}px] w-[${diameter}px]`

  return (
    <div
      className={`${circleSize} flex justify-center items-center  ${textColor} rounded-full ${bgColor}`}
    >
      {capitalizeFirstLetter(username)}
    </div>
  )
}

export default UserCircle
