import RegisterUserCard from "@/components/signup/registerUserCard"
import { NextPage } from "next"

interface Props {}

const Index: NextPage<Props> = ({}) => {
  return (
    <div>
      <RegisterUserCard />
    </div>
  )
}

export default Index
