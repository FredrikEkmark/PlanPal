import AddTaskButton from "@/components/basic/addTaskButton"
import Main from "@/components/basic/main"
import Modal from "@/components/basic/modal"
import CalendarCard from "@/components/calendar/calendarCard"
import Schedule from "@/components/calendar/schedule"
import Header from "@/components/header"
import NavBar from "@/components/navBar"
import { UserContext } from "@/context/user-context-provider"
import { Calendar } from "@/types/calendar"
import { ToDo } from "@/types/toDo"
import { User } from "@/types/user"
import { GetServerSidePropsContext, NextPage } from "next"
import { getSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"
import useModal from "@/components/basic/useModal"
import Image from "next/image"
import DoubleTextInput from "@/components/basic/doubleTextInput"
import Box from "@/components/basic/box"
import InputDate from "@/components/basic/inputDate"
import SmallButton from "@/components/basic/smallButton"
import AddTaskCard from "@/components/toDo/addTaskCard"

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
      setCurrentPage("calendar")
      setUser(data.user)
      setToDo(data.toDo)
    } // set name of folder so navBar know where you are
  )

  // end boilerplate for page //

  const [toggle, setToggle] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())

  const handleDateChange = (date: Date) => {
    setDate(new Date(date.getTime() + 12 * 60 * 60 * 1000))
  }

  const { isOpen, toggle1 } = useModal()

  return (
    <div className="h-screen bg-ourcolors-blue">
      <Header currentPage={currentPage} bright={true} />
      <Main>
        {toggle ? (
          <></>
        ) : (
          <CalendarCard onClickDay={handleDateChange} date={date} />
        )}
        <Schedule
          date={date}
          calendar={calendar}
          toggle={toggle}
          setToggled={setToggle}
        />
        {/* HÄR LIGGER MODEL */}
        <div className="App">
          <button
            className="@apply fixed bottom-[100px] mr-[5%] right-0 bg-ourcolors-blue h-[66px] w-[66px] flex justify-center items-center rounded-full"
            onClick={toggle1}
          >
            <Image
              className="absolut"
              src={"/plusWhite.svg"}
              alt={"#"}
              width={"21"}
              height={"21"}
            ></Image>
          </button>

          <Modal isOpen={isOpen} toggle={toggle1}>
            {/* Skapa en AddCalendarActivityCard*/}
            <AddTaskCard></AddTaskCard>
          </Modal>
        </div>
      </Main>
      <NavBar currentPage={currentPage} />
    </div>
  )
}

export default Index

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
