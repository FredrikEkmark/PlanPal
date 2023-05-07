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

const DisplayToDoCategory = (props: Props) => {
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
  }, [toDo.category, props.title])

  const [lateTasks, setLateTasks] = useState<Task[]>([])
  const [todayTasks, setTodayTasks] = useState<Task[]>([])
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 10) // Get today's date in the format YYYY-MM-DD

    const late = tasks.filter((task) => task.date < now && task.done === false)
    const today = tasks.filter((task) => task.date === now)
    const upcoming = tasks.filter((task) => task.date > now)

    setLateTasks(late)
    setTodayTasks(today)
    setUpcomingTasks(upcoming)
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

  const displayLateTasks = lateTasks.map((item) => (
    <div className="flex my-1" key={item.id}>
      <div
        onClick={() => {}}
        className="flex items-center justify-beginning h-10 mr-[5%]"
      >
        <input
          className="w-5"
          type="checkbox"
          checked={item.done}
          id={`${item.id}`}
          name={item.title}
          value={item.id}
          onChange={(event) => checkHandler(event)}
        />
      </div>
      <Link
        className="flex flex-col items-begining justify-center w-[93%] h-10"
        href={`/toDo/task/${item.id}`}
      >
        <p className=" text-bl">{item.title}</p>
        <p className=" text-ourcolors-font text-bm">{item.description}</p>
      </Link>
    </div>
  ))

  const displayTodayTasks = todayTasks.map((item) => (
    <div className="flex " key={item.id}>
      <div
        onClick={() => {}}
        className="flex items-center justify-beginning h-10 mr-[5%]"
      >
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
      <Link
        className="flex flex-col items-begining justify-center w-[93%] h-10"
        href={`/toDo/task/${item.id}`}
      >
        <p className=" text-bl">{item.title}</p>
        <p className=" text-ourcolors-font text-bm">{item.description}</p>
      </Link>
    </div>
  ))

  const displayUpcomingTasks = upcomingTasks.map((item) => (
    <div className="flex " key={item.id}>
      <div
        onClick={() => {}}
        className="flex items-center justify-beginning h-10 mr-[5%]"
      >
        <input
          className="w-5"
          type="checkbox"
          checked={item.done}
          id={`${item.id}`}
          name={item.title}
          value={item.id}
          onChange={(event) => checkHandler(event)}
        />
      </div>
      <Link
        className="flex flex-col items-begining justify-center w-[93%] h-10"
        href={`/toDo/task/${item.id}`}
      >
        <p className=" text-bl">{item.title}</p>
        <p className=" text-ourcolors-font text-bm">{item.description}</p>
      </Link>
    </div>
  ))

  return (
    <div className={`w-full h-full flex flex-col bg-ourcolors-blue`}>
      <div className="flex p-[5%]  pb-6 ">
        <Image
          src={"/clipBoardWhite.svg"}
          alt={"#"}
          width="28"
          height="34"
          style={{ width: "38px", height: "auto" }}
        ></Image>
        <div>
          <h2 className="mx-2 text-white">{props.title}</h2>
          <p className="mx-2 text-white">
            {todayTasks.length + upcomingTasks.length + lateTasks.length} tasks
          </p>
        </div>
      </div>
      <TaskBoxCard>
        {lateTasks.length > 0 ? (
          <div>
            <p className="font-semibold text-hs text-ourcolors-font">Late</p>
            {displayLateTasks}
          </div>
        ) : (
          <div></div>
        )}
        {todayTasks.length > 0 ? (
          <div>
            <p className="font-semibold text-hs text-ourcolors-font">Today</p>
            {displayTodayTasks}
          </div>
        ) : (
          <div></div>
        )}
        {upcomingTasks.length > 0 ? (
          <div>
            <p className="font-semibold text-hs text-ourcolors-font">
              Upcomming
            </p>
            {displayUpcomingTasks}
          </div>
        ) : (
          <div></div>
        )}
      </TaskBoxCard>
    </div>
  )
}

export default DisplayToDoCategory
