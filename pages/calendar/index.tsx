import Main from "@/components/basic/main"
import Schedule from "@/components/calendar/schedule"
import Header from "@/components/header"
import NavBar from "@/components/navBar"
import { UserContext } from "@/context/user-context-provider"
import { ToDo } from "@/types/toDo"
import { User } from "@/types/user"
import { GetServerSidePropsContext, NextPage } from "next"
import { now } from "next-auth/client/_utils"
import { getSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"

interface Data {
  user: User
  toDo: ToDo
  calendar: string | null
}

interface Props {
  data: Data
}

const Index: NextPage<Props> = ({ data }) => {
  // temp code //
  const tempCalendar = {
    id: "",
    userId: "",
    activites: [
      {
        id: "58383",
        calendarId: "fasjfja",
        date: new Date(now()).toISOString().slice(0, 10) as string,
        startTime: "07:30",
        endTime: "08:30",
        name: "Lektion",
        description: "I skolan",
      },
      {
        id: "58383",
        calendarId: "fasjfja",
        date: new Date(now()).toISOString().slice(0, 10) as string,
        startTime: "08:30",
        endTime: "10:30",
        name: "Super Tidig Lunch",
        description: "Ät Lunch",
      },
    ],
  }

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
      setCurrentPage("calendar")
      setUser(data.user)
      setToDo(data.toDo)
    } // set name of folder so navBar know where you are
  )

  // end boilerplate for page //

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div className="h-screen bg-ourcolors-blue">
      <Header currentPage={currentPage} bright={true} />
      <Main>
        {toggle ? <></> : <div className="w-full h-[40%] bg-slate-500"></div>}
        <Schedule
          date={new Date(now())}
          calendar={tempCalendar}
          toggle={toggle}
          setToggled={setToggle}
        />
      </Main>
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
