import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

import Button from "../basic/button"
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
          ></Image>
        </div>
      </div>
      <div className="flex justify-center text-2xl font-semibold font mt-7 ">
        <h1>Planning made easy!</h1>
      </div>

      <div className="mt-10 ">
        <input
          className="box-border border-b-2 border-[none] border-solid;"
          type="Email"
          placeholder="Email"
        />
      </div>

      <div>
        <input
          className="box-border border-b-2 border-[none] border-solid;"
          type="Password"
          placeholder="Password"
        />
      </div>

      <Button
        className=" mt-10 box-border flex flex-row justify-center items-center gap-2.5 absolute w-[90%] h-14 border p-2.5 rounded-[5px] border-solid border-black left-4 top-[440px];"
        color={"green"}
      >
        Log in with email
      </Button>

      <div className="mt-40 ">
        <p className="text-center ">
          No account?
          <Link
            className=" box-border border-b-2 border-[none] border-solid;"
            href={"/signup"}
          >
            Create one here!
          </Link>
        </p>
      </div>
    </>
  )
}

export default LoginCard
