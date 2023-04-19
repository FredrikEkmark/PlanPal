import LandingGraphic from "@/components/login/landingGraphic"
import LoginCard from "@/components/login/loginCard"
import { NextPage } from "next"

interface Props {}

const Index: NextPage<Props> = ({}) => {
  return (
    <>
      <LandingGraphic />

      <LoginCard />
    </>
  )
}

export default Index
