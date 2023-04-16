import { ReactNode } from "react"

interface Props {
  children: ReactNode
  color: string
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function color(color: string) {
  const css = " w-[171px] h-[40px] rounded-[5px] "

  switch (color) {
    case "green":
      return css + " bg-ourcolors-green text-ourcolors-white"
    case "purple":
      return css + " bg-ourcolors-purple  text-ourcolors-white"
    case "yellow":
      return css + " bg-ourcolors-yellow text-ourcolors-white"
    case "red":
      return css + " bg-ourcolors-red text-ourcolors-white"
    case "white":
    default:
      return (
        css + " bg-ourcolors-white border-solid border-2 text-ourcolors-font"
      )
  }
}

const Button = (props: Props) => {
  return (
    <button
      className={`${color(props.color)} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
