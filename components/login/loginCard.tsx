import { NextPage } from "next"
import Image from "next/image"
interface Props {}

const LoginCard = ({}) => {
  return (
    <>
      <div className="flex items-center justify-center mt-10 ">
        <div className="mt-10">
          <Image
            src={"/logo.svg"}
            alt={"#"}
            width={"200"}
            height={"85"}
            className={""}
          ></Image>
        </div>
      </div>
      <div className="flex justify-center text-2xl font-semibold font mt-7 ">
        <h1>Planning made easy!</h1>
      </div>
    </>
  )
}

export default LoginCard
