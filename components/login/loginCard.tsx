import Image from "next/image"
import Link from "next/link"
import router from "next/router"
import { useState } from "react"
import Button from "../basic/button"
import InputText from "../basic/inputText"
import { signIn } from "next-auth/react"

interface Props {}

const LoginCard = ({}) => {
  // FUNKTIONALLITET HÄR //

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string>("")
  const [displayError, setDisplayError] = useState<string>("")

  function handleEmailChange(newValue: string) {
    setEmail(newValue)
  }

  function handlePasswordChange(newValue: string) {
    setPassword(newValue)
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    })

    if (result === undefined) {
      setDisplayError(
        "The email address and password does not match! Try again!"
      )
    } else {
      if (result.ok) {
        router.push("/")
      } else if (result.error) {
        setError(result.error)
        switch (error) {
          case "CredentialsSignin": {
            setDisplayError(
              "The email address and password dose not match! Try again!"
            )
          }
          default: {
            setDisplayError(
              "The email address and password dose not match! Try again!"
            )
            // router.push("/error/500")
          }
        }
      } else {
        router.push("/error/500")
      }
    }
  }

  // AVSLUTAR DEN HÄR //

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
        onSubmit={handleSignIn}
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
        <p className="text-ourcolors-red text-bs">{displayError}</p>
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
