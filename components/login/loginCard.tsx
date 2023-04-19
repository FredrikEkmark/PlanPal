import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

import Button from "../basic/button"
interface Props {}

const LoginCard = ({}) => {
  // FUNKTIONALLITET HÄR //

  return (
    <div className=" bg-[#FBEE7B] w-[354px] h-[598px]">
      <div className="fixed right-[-12%] left-[85.6%] top-[2.7%];">
        <Image
          src={"/greenStar.svg"}
          alt={"#"}
          width={"100"}
          height={"100"}
        ></Image>
      </div>
      <div className="flex items-center justify-center">
        <div className="mt-20">
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
          className=" bg-transparent left-4 gap-2.5 absolute w-[90%] justify-center box-border border-b-2 border-[none] border-solid;"
          type="Email"
          placeholder="Email"
        />
      </div>

      <div className="mt-20">
        <input
          className=" bg-transparent left-4 gap-2.5 absolute w-[90%] justify-center box-border border-b-2 border-[none] border-solid;"
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

      <div className=" mt-60">
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

      <div className="fixed left-[0.53%] right-[73.07%] bottom-[0.28%] top-[84,71%];  ">
        <Image
          src={"/greenStar.svg"}
          alt={"#"}
          width={"100"}
          height={"100"}
        ></Image>
      </div>
      <div className=" fixed right-[-12%] left-[65.6%] top-[80.7%] relative;">
        <Image
          src={"/purpleSymbol.svg"}
          alt={"#"}
          width={"140"}
          height={"140"}
        ></Image>
      </div>
    </div>
  )
}

export default LoginCard
