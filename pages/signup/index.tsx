import LandingGraphic from "@/components/signup/landingGraphic"
import RegisterUserCard from "@/components/signup/registerUserCard"
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
