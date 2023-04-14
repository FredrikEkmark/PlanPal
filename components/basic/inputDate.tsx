import { useState } from "react"
import Image from "next/image"

interface Props {
  initialValue: string
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
    <div className="flex p-2 border-2 rounded-[10px]">
      <label className="flex text-ourcolors-font" htmlFor="dateInput">
        <Image src="/calendar.svg" alt={"#"} width={"20"} height={"20"}></Image>
        <p className="px-1"></p>
        {"Date"}:{" "}
      </label>
      <input
        className="max-w-[160px] "
        id="dateInput"
        type="date"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default InputDate
