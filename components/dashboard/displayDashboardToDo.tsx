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
    const now = new Date().toISOString().slice(0, 10) // Get today's date in the format YYYY-MM-DD
    setTasks(allTasks)
    const today = tasks.filter((task) => task.date === now)
    setTodayTasks(today)
  }, [])

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
    <div className="w-full pt-20">
      <div className="mx-[5%] flex justify-between items-center">
        <h2 className=" text-hl">Todays Tasks</h2>
        <Link className="text-ourcolors-purple text-bm" href={"/toDo"}>
          View all
        </Link>
      </div>

      <Box>{displayTodayTasks}</Box>
    </div>
  )
}

export default DisplayDashboardToDo
