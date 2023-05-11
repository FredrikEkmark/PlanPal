import { UserContext } from "@/context/user-context-provider"
import { Task } from "@/types/task"
import { ToDo } from "@/types/toDo"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import Box from "../basic/box"
import Link from "next/link"

interface Props {
  toDo: ToDo
}

const DisplayDashboardToDo = ({ toDo }: Props) => {
  const { editTask } = useContext(UserContext)

  const [tasks, setTasks] = useState<Task[]>([])
  const [todayTasks, setTodayTasks] = useState<Task[]>([])

  useEffect(() => {
    const allTasks = toDo.category.flatMap((category) => category.toDoList)
    setTasks(allTasks)
  }, [toDo])

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 10) // Get today's date in the format YYYY-MM-DD
    const today = tasks.filter((task) => task.date === now)
    setTodayTasks(today)
  }, [tasks])

  const checkHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const originalTask = tasks.find((task) => task.id === event.target.id)
    if (originalTask) {
      editTask({
        title: originalTask?.title,
        date: originalTask?.date,
        id: originalTask?.id,
        categoryId: originalTask.categoryId,
        description: originalTask?.description,
        done: event.target.checked,
      })
    } else {
      console.log("ERROR Task in undefined")
    }
  }

  const displayTodayTasks = todayTasks.map((item) => (
    <div className="flex items-center " key={item.id}>
      <div className="flex items-center justify-beginning h-8 mr-[5%]">
        <input
          className="w-5 "
          type="checkbox"
          checked={item.done}
          id={`${item.id}`}
          name={item.title}
          value={item.id}
          onChange={(event) => checkHandler(event)}
        />
      </div>
      <p className=" text-ourcolors-font text-bl">{item.title}</p>
    </div>
  ))

  return (
    <div className="w-full">
      <div className="mx-[5%] flex justify-between items-center">
        <h2 className=" text-hm">Todays Tasks</h2>
        <Link className="text-ourcolors-purple text-hxs" href={"/toDo"}>
          View all
        </Link>
      </div>

      {displayTodayTasks.length > 0 ? (
        <Box>{displayTodayTasks}</Box>
      ) : (
        <Box>
          <p>You have no tasks</p>
        </Box>
      )}
    </div>
  )
}

export default DisplayDashboardToDo
