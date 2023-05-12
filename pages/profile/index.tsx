import Header from "@/components/header"
import NavBar from "@/components/navBar"
import ProfileCard from "@/components/profile/profileCard"
import { UserContext } from "@/context/user-context-provider"
import { Calendar } from "@/types/calendar"
import { ToDo } from "@/types/toDo"
import { User } from "@/types/user"
import { GetServerSidePropsContext, NextPage } from "next"
import { getSession, signOut } from "next-auth/react"
import { useContext, useEffect } from "react"

type UserData = {
  user: User
  toDo: ToDo
  calendar: Calendar
}

type FetchResult = {
  result: {
    success: boolean
    error?: string
    body?: UserData
  }
}

interface Props {
  data: UserData
}

const Index: NextPage<Props> = ({ data }: Props) => {
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
      setUser(data.user)
      setToDo(data.toDo)
      setCalendar(data.calendar)
    } // set name of folder so navBar know where you are
  )

  // end boilerplate for page //

  const URLCurrentPage = () => {
    if (currentPage === "todo") {
      return "/toDo"
    } else if (currentPage === "calendar") {
      return "/calendar"
    }
    return "/"
  }

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/signin" })
  }

  return (
    <div>
      <Header currentPage={"Profile"} link={URLCurrentPage()} />
      <ProfileCard user={user} logout={logout} />
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

  const data = JSON.parse(JSON.stringify(json)) as FetchResult
  console.log(data)

  if (data.result.success && data.result.body) {
    return {
      props: {
        data: data.result.body,
      },
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
}

// end of boilerpalte getServerSideProps
