import InputDate from "../basic/inputDate"
import { useContext, useState } from "react"
import Link from "next/link"
import DoubleTextInput from "../basic/doubleTextInput"
import Box from "../basic/box"
import SmallButton from "../basic/smallButton"
import InputTimeEnd from "../basic/inputTimeEnd"
import InputTimeStart from "../basic/inputTimeStart"
import { Activity } from "@/types/calendar"
import { UserContext } from "@/context/user-context-provider"
import { addCalActivFetch } from "@/functions/addCalActivFetch"

interface Props {}

const AddCalendarActivityCard = ({}) => {
  const { user, calendar } = useContext(UserContext)

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

  async function handleSubmit() {
    const [startHour, startMinute] = startTimeInput.split(":").map(Number)
    const [endHour, endMinute] = endTimeInput.split(":").map(Number)

    let totalMinutes = startHour * 60 + startMinute + endHour * 60 + endMinute

    // Adjust the total minutes if it exceeds 24 hours (1440 minutes)
    totalMinutes %= 1440

    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60

    const endTime = `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`

    const newActivity: Activity = {
      name: titleInput,
      id: "",
      calendarId: calendar.id,
      description: descriptionInput,
      date: dateInput,
      startTime: startTimeInput,
      endTime: endTime,
    }
    const result = await addCalActivFetch(newActivity, user)
    console.log(result.success)
  }
  return (
    <div>
      <Box>
        <DoubleTextInput
          topPlaceholder="Title"
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
