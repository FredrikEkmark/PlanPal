import { NextPage } from "next"
import Image from "next/image"

interface Props {}

const LandingGraphic = (props: Props) => {
  return (
    <>
      <div className="relative mt-10 inset-y-6">
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
            src={"/logoYellow.svg"}
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

export default LandingGraphic
