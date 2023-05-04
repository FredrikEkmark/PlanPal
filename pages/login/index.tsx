import LoginCard from "@/components/login/loginCard"
import { ToDo } from "@/types/toDo"
import { User } from "@/types/user"
import { GetServerSidePropsContext, NextPage } from "next"
import { getSession } from "next-auth/react"

interface Data {
  user: User
  toDo: ToDo
  calendar: string | null
}

interface Props {
  data: Data
}

const Index: NextPage<Props> = ({}) => {
  return (
    <>
      <LoginCard />
    </>
  )
}

export default Index
