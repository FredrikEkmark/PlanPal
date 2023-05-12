import { NextPage } from "next"
import InputDate from "../basic/inputDate"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/user-context-provider"
import { randomUUID } from "crypto"
import Link from "next/link"
import DoubleTextInput from "../basic/doubleTextInput"
import Box from "../basic/box"
import SmallButton from "../basic/smallButton"
import InputTimeEnd from "../basic/inputTimeEnd"
import InputTimeStart from "../basic/inputTimeStart"

interface Props {}

const AddCalendarActivityCard = ({}) => {
  const [titleInput, setTitleInput] = useState<string>("")

  function handleTitleInput(newValue: string) {
    setTitleInput(newValue)
  }

  const [descriptionInput, setDescriptionInput] = useState<string>("")

  function handleDescriptionInput(newValue: string) {
    setDescriptionInput(newValue)
  }

  const [dateInput, setDateInput] = useState<string>(
    new Date().toISOString().slice(0, 10)
  )

  function handleDateInput(newValue: string) {
    setDateInput(newValue)
  }

  const [startTimeInput, setStartTimeInput] = useState<string>("")

  function handleStartTimeInput(newValue: string) {
    setStartTimeInput(newValue)
  }
  const [endTimeInput, setEndTimeInput] = useState<string>("")

  function handleEndTimeInput(newValue: string) {
    setEndTimeInput(newValue)
  }

  function handleSubmit() {
    const newActivity = {
      title: titleInput,
      description: descriptionInput,
      id: `${Math.random()}`, // this should be changed
      date: dateInput,
      start: startTimeInput,
      end: endTimeInput,
      done: false,
    }
  }
  return (
    <div>
      <Box>
        <DoubleTextInput
          initialValueTop={titleInput}
          initialValueBottom={descriptionInput}
          onChangeTop={handleTitleInput}
          onChangeBottom={handleDescriptionInput}
        />
      </Box>
      <Box className="flex flex-col items-center">
        <InputDate
          className="w-full my-2"
          initialValue={dateInput}
          onChange={handleDateInput}
        />
        <InputTimeStart
          className="w-full my-2"
          initialValue={startTimeInput}
          onChange={handleStartTimeInput}
        />
        <InputTimeEnd
          className="w-full my-2"
          initialValue={endTimeInput}
          onChange={handleEndTimeInput}
        />

        <Link href={"/calendar"}>
          <SmallButton
            className="my-2 mt-3"
            onClick={handleSubmit}
            color={"blue"}
          >
            Create
          </SmallButton>
        </Link>
      </Box>
    </div>
  )
}

export default AddCalendarActivityCard
