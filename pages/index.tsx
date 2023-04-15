import Box from "@/components/basic/box"
import Button from "@/components/basic/button"
import InputCategory from "@/components/basic/inputCategroy"
import InputDate from "@/components/basic/inputDate"
import Header from "@/components/header"
import NavBar from "@/components/navBar"
import { UserContext } from "@/context/user-context-provider"
import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"

interface Props {}

const Index: NextPage<Props> = ({}) => {
  // start boilerplate for page //

  const {
    username,
    setUsername,
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

  useEffect(
    () => setCurrentPage("home") // set name of folder so navBar know where you are
  )

  // end boilerplate for page //

  // start boilerplate for input change

  const [input, setDateInput] = useState<string>("")

  function handleDateInput(newValue: string) {
    setDateInput(newValue)
  }

  const [categoryInput, setCategoryInput] = useState<string>("")

  function handleCategoryInput(newValue: string) {
    setCategoryInput(newValue)
  }

  // end boilerplate for input change

  return (
    <div>
      <Header currentPage={currentPage} />
      <Box>
        <p>test</p>
        <Button color={"purple"}>Save</Button>
        <br />
        <InputDate onChange={handleDateInput} initialValue={input} />
        <br />
        <p>{input}</p>
        <InputCategory
          categories={toDo.category}
          onChange={handleCategoryInput}
          initialValue={categoryInput}
        ></InputCategory>
        <br />
        <p>{categoryInput}</p>
      </Box>
      <NavBar currentPage={currentPage} />
    </div>
  )
}

export default Index
