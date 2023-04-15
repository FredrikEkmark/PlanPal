import Box from "@/components/basic/box"
import InputDate from "@/components/basic/inputDate"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

interface Props {}

const Task: NextPage<Props> = ({}) => {
  const router = useRouter()
  const value = router.query.category as string

  return <div></div>
}

export default Task
