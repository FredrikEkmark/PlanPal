import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import router from "next/router"
import { useState } from "react"
import { PrismaClient } from "@prisma/client"

import Button from "../basic/button"
interface Props {}

const LoginCard = ({}) => {
  // FUNKTIONALLITET HÄR //

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const authHeader = `Basic ${btoa(`${email}:${password}`)}`

    const response = await fetch("http://localhost:3000/api/login", {
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
      router.push("/") // Här skickas vi vidare till Home
    }

    // AVSLUTAR DEN HÄR //
  }
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

      <form className="mt-2" onSubmit={handleSubmit}>
        {" "}
        {/* Här löser vi inloggen steg 1 */}
        <input
          className=" mt-10 bg-transparent left-4 gap-2.5 absolute w-[90%] justify-center box-border border-b-2 border-[none] border-solid;"
          type="email"
          placeholder="email@somthing.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required // Kolla om vi ska ha dennna här //
        />
        <input
          className=" mt-20 bg-transparent left-4 gap-2.5 absolute w-[90%] justify-center box-border border-b-2 border-[none] border-solid;"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          className=" mt-32 box-border flex flex-row justify-center items-center gap-2.5 absolute w-[90%] h-14 border p-2.5 rounded-[5px] border-solid border-black left-4 top-[440px];"
          color={"green"}
        >
          Log in with email
        </Button>
      </form>

      <p className="absolute mt-60 left-16">
        No account? <span> </span>
        <Link
          className=" box-border border-b-2 border-[none] border-solid;"
          href={"/signup"}
        >
          Create one here!
        </Link>
      </p>

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
