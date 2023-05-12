import { useState } from "react"
import Image from "next/image"

interface Props {
  initialValue: string
  className?: string
  onChange: (value: string) => void
}

const InputDate = (props: Props) => {
  const [value, setValue] = useState(props.initialValue)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setValue(newValue)
    props.onChange(newValue)
  }

  return (
    <div
      className={`flex p-2 border-2 rounded-[10px] w-[90%] mx-[5%] ${props.className}`}
    >
      <Image src={"/dateIcon.svg"} alt={"#"} width={"20"} height={"20"}></Image>
      <label className="flex px-1 text-ourcolors-font" htmlFor="dateInput">
        <p className="px-1"></p>
        {"Date"}:{" "}
      </label>
      <input
        className="max-w-[160px]"
        id="dateInput"
        type="date"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default InputDate
