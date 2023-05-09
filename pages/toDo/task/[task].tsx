import Box from "@/components/basic/box"
import InputDate from "@/components/basic/inputDate"
import Main from "@/components/basic/main"
import Header from "@/components/header"
import HeaderClear from "@/components/headerClear"
import AddTaskCard from "@/components/toDo/addTaskCard"
import EditTaskCard from "@/components/toDo/editTaskCard"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

interface Props {}

const Task: NextPage<Props> = ({}) => {
  const router = useRouter()
  const value = router.query.task as string

  return (
    <div className="h-screen">
      <Header currentPage={"Edit Task"} link="/toDo" />
      <Main>
        <EditTaskCard id={value} />
      </Main>
    </div>
  )
}

export default Task
