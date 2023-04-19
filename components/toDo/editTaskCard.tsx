import InputDate from "../basic/inputDate"
import InputCategory from "../basic/inputCategroy"
import Button from "../basic/button"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/user-context-provider"
import Link from "next/link"
import DoubleTextInput from "../basic/doubleTextInput"
import Box from "../basic/box"
import { getTaskById } from "@/functions/getTaskById"
import { Task } from "@/types/task"
import { getCategoryById } from "@/functions/checkIfLoggedIn"

interface Props {
  id: string
}

const EditTaskCard = (props: Props) => {
  const {
    user,
    setUser,
    currentPage,
    setCurrentPage,
    toDo,
    setToDo,
    addTask,
    editTask,
    deleteTask,
    calendar,
    setCalendar,
  } = useContext(UserContext)

  const [originalTask, setOriningalTask] = useState<Task>(
    getTaskById(toDo, props.id)
  )

  const [titleInput, setTitleInput] = useState<string>(originalTask.title)

  function handleTitleInput(newValue: string) {
    setTitleInput(newValue)
  }

  const [descriptionInput, setDescriptionInput] = useState<string>(
    originalTask.description
  )

  function handleDescriptionInput(newValue: string) {
    setDescriptionInput(newValue)
  }

  const [dateInput, setDateInput] = useState<string>(originalTask.date)

  function handleDateInput(newValue: string) {
    setDateInput(newValue)
  }

  const [categoryInput, setCategoryInput] = useState<string>(
    getCategoryById(toDo, originalTask.categoryId).title
  )

  function handleCategoryInput(newValue: string) {
    setCategoryInput(newValue)
  }

  function handleSubmit() {
    const categoryId = toDo.category.find(
      (category) => category.title === categoryInput
    )?.id
    if (categoryId === undefined) {
      return "Error no such category"
    }
    const editedTask = {
      title: titleInput,
      description: descriptionInput,
      id: originalTask.id, // this should be changed
      categoryId: categoryId,
      date: dateInput,
      done: originalTask.done,
    }
    editTask(editedTask)
    console.log("handle submithas been called " + editedTask.id)
  }

  function handleDelete() {
    deleteTask(originalTask)
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
        <InputCategory
          className="w-full my-2"
          categories={toDo.category}
          onChange={handleCategoryInput}
          initialValue={categoryInput}
        />
        <div className="flex flex-row justify-around w-full">
          <Link href={"/toDo"}>
            <Button
              className="my-4 mt-8 w-[100px]"
              onClick={handleSubmit}
              color={"green"}
            >
              Save
            </Button>
          </Link>
          <Link href={"/toDo"}>
            <Button
              className="my-4 mt-8 w-[100px]"
              onClick={handleDelete}
              color={"red"}
            >
              Delete
            </Button>
          </Link>
        </div>
      </Box>
    </div>
  )
}

export default EditTaskCard
