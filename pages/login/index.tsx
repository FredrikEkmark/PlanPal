import Box from "@/components/basic/box"
import RegisterUserCard from "@/components/login/registerUserCard"
import RegisterUserGraphic from "@/components/login/registerUserGraphic"
import { NextPage } from "next"

interface Props {}

const Index: NextPage<Props> = ({}) => {
  return (
    <>
      <RegisterUserGraphic />

      <RegisterUserCard />
    </>
  )
}

export default Index
