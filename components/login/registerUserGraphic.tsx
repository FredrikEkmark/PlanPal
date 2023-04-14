import { NextPage } from "next"
import Image from "next/image"
import Box from "../basic/box"

interface Props {}

const RegisterUserGraphic = (props: Props) => {
  return (
    <>
      <div className="relative inset-y-6 mt-10">
        <div className="mt-10">
          <Image
            src={"/greenBgForIcon.svg"}
            alt={"background image"}
            width={"180"}
            height={"150"}
            className={
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-6"
            }
          ></Image>

          <Image
            src={"/planPalYellow.svg"}
            alt={"planpal icon yellow"}
            width={"169"}
            height={"150"}
            className={
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-6"
            }
          ></Image>
        </div>
      </div>
    </>
  )
}

export default RegisterUserGraphic
