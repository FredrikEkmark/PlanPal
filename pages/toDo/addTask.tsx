import Box from "@/components/basic/box"
import Button from "@/components/basic/button"
import InputCategory from "@/components/basic/inputCategroy"
import InputDate from "@/components/basic/inputDate"
import Header from "@/components/header"
import AddTaskCard from "@/components/toDo/addTaskCard"
import { UserContext } from "@/context/user-context-provider"
import { NextPage } from "next"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"

interface Props {}

const AddTask: NextPage<Props> = ({}) => {
  return (
    <div>
      <Header currentPage={"Create Task"}></Header>
      <AddTaskCard />
    </div>
  )
}

export default AddTask
