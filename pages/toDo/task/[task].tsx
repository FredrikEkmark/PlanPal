import Box from "@/components/basic/box"
import InputDate from "@/components/basic/inputDate"
import Header from "@/components/header"
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
    <div>
      <Header currentPage={"Edit Task"} />
      <EditTaskCard id={value} />
    </div>
  )
}

export default Task
