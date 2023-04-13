import Box from "@/components/basic/box"
import Button from "@/components/basic/button"
import Input from "@/components/basic/input"
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

  setCurrentPage("home") // set name of folder so navBar know where you are

  // end boilerplate for page //

  // start boilerplate for input change

  const [input, setInput] = useState<string>("")

  function handleInput(newValue: string) {
    setInput(newValue)
  }

  // end boilerplate for input change

  return (
    <div>
      <Header currentPage={currentPage} />
      <Box>
        <p>test</p>
        <Button color={"red"}>Save</Button>
        <br />
        <Input
          onChange={handleInput}
          lable="Date"
          type={"date"}
          initialValue={input}
        ></Input>
      </Box>
      <NavBar currentPage={currentPage} />
    </div>
  )
}

export default Index
