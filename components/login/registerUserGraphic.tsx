import { NextPage } from "next"
import Image from "next/image"

interface Props {}

const RegisterUserGraphic = (props: Props) => {
  return (
    <>
      <div className="relative inset-y-12 mt-12">
        <div className="">
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
