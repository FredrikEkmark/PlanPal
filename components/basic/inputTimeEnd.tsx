import { useState } from "react"
import Image from "next/image"

interface Props {
  initialValue: string
  className?: string
  onChange: (value: string) => void
}

const InputTimeEnd = (props: Props) => {
  const [time, setTime] = useState(props.initialValue)

  const times = []
  for (let hour = 0; hour < 3; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
      times.push(time)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setTime(newValue)
    props.onChange(newValue)
  }

  return (
    <div
      className={`flex p-2 border-2 rounded-[10px] w-[90%] mx-[5%] ${props.className}`}
    >
      <Image src={"/timeIcon.svg"} alt={"#"} width={"20"} height={"20"}></Image>
      <label className="flex px-1 text-ourcolors-font" htmlFor="time">
        <p className="px-1"></p>
        {"End Time"}:{""}
      </label>
      <select
        id="time"
        name="time"
        value={time}
        onChange={(event) => setTime(event.target.value)}
      >
        <option className="" value="">
          Pick
        </option>
        {times.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  )
}

export default InputTimeEnd
