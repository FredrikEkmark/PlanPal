import { NextPage } from "next"
import apply from "assert"
import Image from "next/image"
import InputText from "../basic/inputText"
import Button from "../basic/button"
import { useState } from "react"
import Link from "next/link"
import router from "next/router"
import { createStandardCategories } from "@/functions/createStandardCategories"

interface Props {}

const RegisterUserCard = ({}) => {
  // FUNKTIONALLITET HÄR //

  const [firstname, setFirstname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleFirstnameChange(newValue: string) {
    setFirstname(newValue)
  }

  function handleEmailChange(newValue: string) {
    setEmail(newValue)
  }

  function handlePasswordChange(newValue: string) {
    setPassword(newValue)
  }
  function handleConfirmPasswordChange(newValue: string) {
    setConfirmPassword(newValue)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const authHeader = `Basic ${btoa(
      `${"YE9i5JoZnk22PFOS5VsAcifqeDplKtTlY6pNY6MR"}:${"QNjvvNrSEekwF3b4OcbdTrC2Qm5Uq1biHvfK1TKz"}`
    )}`

    const userBody = {
      email: email,
      password: password,
      firstName: firstname,
    }

    const response = await fetch(`../api/user/post`, {
      // ändrat denna till signup

      method: "POST", // byter metod till POST
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(userBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    })
    const json = await response.json()
    const data = JSON.parse(JSON.stringify(json.result))

    if (data.email === email) {
      const categories = createStandardCategories(
        data.id,
        data.email,
        data.password
      )
      console.log(categories)
      router.push("/toDo") // Här skickas vi vidare till Home
    } else {
      console.log(data)
    }
  }
  // AVSLUTAR DEN HÄR //

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
      <div className="flex justify-center mt-4 mb-9 ">
        <h1 className="font-semibold text-hm">Hello! Sign up to get started</h1>
      </div>

      <form
        className="mt-1 mx-[5%] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {" "}
        <InputText
          className="my-1 "
          type="name"
          placeholder="Full Name"
          initialValue={firstname}
          onChange={handleFirstnameChange} // La till denna
        />
        <InputText
          className="my-1 "
          type="email"
          placeholder="Email"
          initialValue={email}
          onChange={handleEmailChange}
        />
        <InputText
          className="my-1 "
          type="password"
          placeholder="Password"
          initialValue={password}
          onChange={handlePasswordChange}
        />
        <InputText
          className="my-1 "
          type="password"
          placeholder="Confirm password"
          initialValue={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Button className="w-full my-1 " color={"blue"}>
          Sign Up!
        </Button>
        <div className="relative flex flex-col items-center w-screen">
          <p className=" text-bs">
            By creating an account, I agree to PlanPal`&apos;`s
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
