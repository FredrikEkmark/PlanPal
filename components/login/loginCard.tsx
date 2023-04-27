import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import router from "next/router"
import { useState } from "react"
import { PrismaClient } from "@prisma/client"

import Button from "../basic/button"
import InputText from "../basic/inputText"
interface Props {}

const LoginCard = ({}) => {
  // FUNKTIONALLITET HÄR //

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleEmailChange(newValue: string) {
    setEmail(newValue)
  }

  function handlePasswordChange(newValue: string) {
    setPassword(newValue)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const authHeader = `Basic ${btoa(`${email}:${password}`)}`

    const response = await fetch(`../api/login`, {
      // Kolla om denna finns! //
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    })
    const json = await response.json()
    const data = JSON.parse(JSON.stringify(json.result))

    if (data.email === email) {
      router.push("/toDo") // Här skickas vi vidare till Home
    }

    // AVSLUTAR DEN HÄR //
  }
  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center">
        <div className="w-40 mt-10">
          <Image
            src={"/newlogo.svg"}
            alt={"#"}
            width={"224"}
            height={"41"}
          ></Image>
        </div>
      </div>
      <div className="flex justify-center mt-7 mb-9 ">
        <h1 className="font-semibold text-hm">Planning made easy!</h1>
      </div>

      <form
        className="mt-2 mx-[5%] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {" "}
        {/* Här löser vi inloggen steg 1 */}
        <InputText
          className="my-2 "
          type="email"
          placeholder="Enter your email"
          initialValue={email}
          onChange={handleEmailChange}
          // Kolla om vi ska ha dennna här //
        />
        <InputText
          className="my-2 "
          type="password"
          placeholder="Enter your password"
          initialValue={password}
          onChange={handlePasswordChange}
        />
        <Button className="w-full my-8 " color={"blue"}>
          Login
        </Button>
      </form>
      <div className="fixed flex justify-center w-screen bottom-5 ">
        <p className=" text-hs">
          Don`&apos;`t have an account? <span> </span>
          <Link
            className=" text-ourcolors-purple box-border border-b-2 border-[none] border-solid;"
            href={"/signup"}
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginCard
