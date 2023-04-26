import { NextPage } from "next"
import apply from "assert"
import Image from "next/image"
import InputText from "../basic/inputText"
import Button from "../basic/button"
import { useState } from "react"
import Link from "next/link"

interface Props {}

const RegisterUserCard = ({}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-40 mt-10 ">
          <Image
            src={"/newlogo.svg"}
            alt={"#"}
            width={"224"}
            height={"41"}
          ></Image>
        </div>
      </div>
      <div className="flex justify-center mt-7 mb-9 ">
        <h1 className="font-semibold text-hm">Hello! Sign up to get started</h1>
      </div>

      <form
        className="mt-2 mx-[5%] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {" "}
        <InputText
          className="my-2 "
          type="email"
          placeholder="Full Name"
          initialValue={email}
          onChange={setEmail}
          // Kolla om vi ska ha dennna här //
        />
        <InputText
          className="my-2 "
          type="email"
          placeholder="Email"
          initialValue={email}
          onChange={setEmail}
          // Kolla om vi ska ha dennna här //
        />
        <InputText
          className="my-2 "
          type="password"
          placeholder="Password"
          initialValue={password}
          onChange={setPassword}
        />
        <InputText
          className="my-2 "
          type="password"
          placeholder="Confirm password"
          initialValue={password}
          onChange={setPassword}
        />
        <Button className="w-full my-8 " color={"blue"}>
          Sign Up!
        </Button>
        <div className="relative flex flex-col items-center w-screen">
          <p className=" text-bs">
            By creating an account, I agree to PlanPal's
          </p>{" "}
          <Link
            className=" text-bs text-ourcolors-purple box-border border-b-2 border-[none] border-solid;"
            href={"/signup"}
          >
            privacy policy
          </Link>
        </div>
      </form>

      <div className="fixed flex flex-col items-center w-screen bottom-5">
        <p className="mt-3 text-hs">
          Already have an account? <span> </span>
          <Link
            className=" text-ourcolors-purple box-border border-b-2 border-[none] border-solid;"
            href={"/login"}
          >
            Log in now
          </Link>
        </p>
      </div>
    </>
  )
}

export default RegisterUserCard
