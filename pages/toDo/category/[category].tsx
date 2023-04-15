import Header from "@/components/header"
import NavBar from "@/components/navBar"
import DisplayToDoCategory from "@/components/toDo/displayToDoCategory"
import { BrowserRouter as Router, Route, useParams } from "react-router-dom"
import { UserContext } from "@/context/user-context-provider"
import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { Task } from "@/types/task"

interface Props {}

const Category: NextPage<Props> = ({}) => {
  const router = useRouter()
  const value = router.query.category as string

  let title = value || "All Tasks"

  if (title === "all") {
    title = "All Tasks"
  }

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
      <DisplayToDoCategory title={title}></DisplayToDoCategory>
      <NavBar currentPage={currentPage} />
    </div>
  )
}

export default Category
