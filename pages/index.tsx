import Header from "@/components/header"
import NavBar from "@/components/navBar"
import DisplayToDoCategory from "@/components/toDo/displayToDoCategory"
import ToDoCategories from "@/components/toDo/toDoCategories"
import { UserContext } from "@/context/user-context-provider"
import { ToDo } from "@/types/toDo"
import { User } from "@/types/user"
import { GetServerSidePropsContext, NextPage } from "next"
import { getSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"
import DashboardTaskCard from "@/components/dashboard/dashboardTaskCard"
import DashboardWelcome from "@/components/dashboard/dashboardWelcome"
import DashboardCalendarCard from "@/components/dashboard/dashboardCalendarCard"

interface Data {
  user: User
  toDo: ToDo
  calendar: string | null
}

interface Props {
  data: Data
}

const Index: NextPage<Props> = ({ data }) => {
  // start boilerplate for page //

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

  useEffect(
    () => {
      setCurrentPage("home")
      setUser(data.user)
      setToDo(data.toDo)
    } // set name of folder so navBar know where you are
  )

  // end boilerplate for page //

  // start boilerplate for input change

  const [input, setDateInput] = useState<string>("")

  function handleDateInput(newValue: string) {
    setDateInput(newValue)
  }

  const [categoryInput, setCategoryInput] = useState<string>("")

  function handleCategoryInput(newValue: string) {
    setCategoryInput(newValue)
  }

  // end boilerplate for input change

  return (
    <div>
      <Header currentPage={currentPage} />
      <DashboardWelcome username={""}></DashboardWelcome>

      <DashboardTaskCard></DashboardTaskCard>

      <DashboardCalendarCard></DashboardCalendarCard>

      <NavBar currentPage={currentPage} />
    </div>
  )
}

export default Index

// start of boilerpalte getServerSideProps

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  const username = session?.user?.email
  const password = session?.user?.name
  const userId = session?.user?.image

  const headers = new Headers()
  headers.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`)

  const res = await fetch(
    `${process.env.URL}/api/user/getFullUserData?id=${userId}`,
    {
      headers,
      credentials: "include",
    }
  )
  const json = await res.json()

  const data = JSON.parse(JSON.stringify(json.result)) as Data

  if (!(data.user && data.toDo && data.calendar)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: {
        user: data.user,
        toDo: data.toDo,
        calendar: null,
      },
    },
  }
}

// end of boilerpalte getServerSideProps
