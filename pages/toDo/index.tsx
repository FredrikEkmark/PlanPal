import Header from "@/components/header"
import NavBar from "@/components/navBar"
import ToDoCategories from "@/components/toDo/toDoCategories"
import { UserContext } from "@/context/user-context-provider"
import { ToDo } from "@/types/toDo"
import { User } from "@/types/user"
import { GetServerSidePropsContext, NextPage } from "next"
import { useContext, useEffect } from "react"
import { getSession, useSession } from "next-auth/react"

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
      setCurrentPage("todo")
      setUser(data.user)
      setToDo(data.toDo)
    } // set name of folder so navBar know where you are
  )

  // end boilerplate for page //

  return (
    <div>
      <Header currentPage={currentPage} />
      <ToDoCategories categorys={toDo.category} />

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
  const password = session?.user?.password
  const userId = session?.user?.id

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
