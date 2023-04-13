import { useState } from "react"
import Image from "next/image"

interface Props {
  type: string
  initialValue: string
  lable: string
  onChange: (value: string) => void
}

const Input = (props: Props) => {
  const [value, setValue] = useState(props.initialValue)

  function img(type: string) {
    switch (type) {
      case "date":
        return "/calendar.svg"
      case "category":
        return "/lable.svg"
      case "notis":
        return "/bell.svg"
      default:
        return ""
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setValue(newValue)
    props.onChange(newValue)
  }

  return (
    <div className="flex p-2 border-2 rounded-[10px]">
      <label className="flex text-ourcolors-font" htmlFor="input">
        <Image
          src={img(props.type)}
          alt={"#"}
          width={"20"}
          height={"20"}
        ></Image>
        <p className="px-1"></p>
        {props.lable}:{" "}
      </label>
      <input
        className="max-w-[160px] "
        id="input"
        type={props.type}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Input
