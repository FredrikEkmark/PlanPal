import { NextPage } from "next"
import { useState } from "react"

interface Props {
  initialValueTop: string
  initialValueBottom: string
  onChangeTop: (value: string) => void
  onChangeBottom: (value: string) => void
  className?: string
}

const DoubleTextInput = (props: Props) => {
  const [valueTop, setValueTop] = useState(props.initialValueTop)
  const [valueBottom, setValueBottom] = useState(props.initialValueBottom)

  function handleChangeTop(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setValueTop(newValue)
    props.onChangeTop(newValue)
  }

  function handleChangeBottom(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setValueBottom(newValue)
    props.onChangeBottom(newValue)
  }

  return (
    <div className={`w-full ${props.className}`}>
      <input
        className="w-full border-ourcolors-fonts border-b-[1px]"
        type="text"
        value={props.initialValueTop}
        placeholder="Write a task"
        onChange={handleChangeTop}
      />
      <input
        className="w-full"
        type="text"
        value={props.initialValueBottom}
        placeholder="Description"
        onChange={handleChangeBottom}
      />
    </div>
  )
}

export default DoubleTextInput
