import { NextPage } from "next"
import { useState } from "react"

interface Props {
  initialValue: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  type: string
}

const InputText = (props: Props) => {
  const [value, setValue] = useState(props.initialValue)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setValue(newValue)
    props.onChange(newValue)
  }

  return (
    <div className={`w-full ${props.className}`}>
      <input
        className="w-full h-12 px-4 text-bl rounded-[10px] border-2 border-ourcolors-bluegray focus:outline-none focus:ring-2 focus: ring-ourcolors-blue"
        type={props.type}
        value={props.initialValue}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </div>
  )
}

export default InputText
