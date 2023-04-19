import LandingGraphic from "@/components/login/landingGraphic"
import RegisterUserCard from "@/components/login/registerUserCard"
import { NextPage } from "next"

interface Props {}

const Index: NextPage<Props> = ({}) => {
  return (
    <div>
      <LandingGraphic />

      <RegisterUserCard />
    </div>
  )
}

export default Index
