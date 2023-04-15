import Header from "@/components/header"
import NavBar from "@/components/navBar"
import ToDoCategories from "@/components/toDo/toDoCategories"
import { UserContext } from "@/context/user-context-provider"
import { NextPage } from "next"
import { useContext, useEffect } from "react"

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
    () => setCurrentPage("todo") // set name of folder so navBar know where you are
  )

  // end boilerplate for page //

  return (
    <div>
      <Header currentPage={currentPage} />
      <ToDoCategories categorys={toDo.category} />

      <NavBar currentPage={currentPage} />
    </div>
  )
}

export default Index
