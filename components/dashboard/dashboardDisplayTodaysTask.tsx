import Image from "next/image"
import TaskBoxCard from "../basic/taskBoxCard"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/user-context-provider"
import { Task } from "@/types/task"
import Link from "next/link"
import { title } from "process"

interface Props {
  title: string
}

const DashboardDisplayTodaysTask = (props: Props) => {
  const {
    user,
    setUser,
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

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    if (props.title === "All Tasks") {
      const allTasks = toDo.category.flatMap((category) => category.toDoList)
      setTasks(allTasks)
    } else {
      const category = toDo.category.find(
        (category) => category.title === props.title
      )
      if (category) {
        setTasks(category.toDoList)
      }
    }
    // start of hardcoded example task
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: "example-task",
        title: "Example Task",
        description: "This is an example task",
        date: "2023-05-07",
        done: false,
        categoryId: "category-id",
      },
    ])
    //end of hardcoded example task
    // start of hardcoded example task
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: "example-task2",
        title: "Example Task2",
        description: "This is an example task",
        date: "2023-05-07",
        done: false,
        categoryId: "category-id",
      },
    ])
    //end of hardcoded example task
  }, [toDo.category, props.title])

  const [todayTasks, setTodayTasks] = useState<Task[]>([])

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 10) // Get today's date in the format YYYY-MM-DD

    const today = tasks.filter((task) => task.date === now)

    setTodayTasks(today)
  }, [tasks])

  const checkHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryIndex = toDo.category.findIndex(
      (category) => category.title === props.title
    )
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
    <div className="" key={item.id}>
      <div onClick={() => {}} className="flex items-center space-x-2 text-hs">
        <input
          className="form-checkbox"
          type="checkbox"
          checked={item.done}
          id={`${item.id}`}
          name={item.title}
          value={item.id}
          onChange={(event) => checkHandler(event)}
        />
        <Link className="" href={`/toDo/task/${item.id}`}>
          <p className=" text-bl">{item.title}</p>
        </Link>
      </div>
      <div className="ml-5">
        <p className=" text-ourcolors-font text-bm">{item.description}</p>
      </div>
    </div>
  ))

  return <>{todayTasks.length > 0 ? <div>{displayTodayTasks}</div> : null}</>
}

export default DashboardDisplayTodaysTask

//flex p-[5%] pt-8 pb-6
