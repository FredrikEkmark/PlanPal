import Image from "next/image"
import Link from "next/link"
import UserCircle from "./basic/userCircle"
import { useContext } from "react"
import { UserContext } from "@/context/user-context-provider"

interface Props {
  currentPage: string
  link?: string
  bright?: boolean
}

const HeaderClear = ({ currentPage, link, bright }: Props) => {
  let arrow = "/blackArrow.svg"
  let userImg = "/user.svg"
  let text = "text-ourcolors-black"
  let profileColor

  const { user } = useContext(UserContext)

  if (bright) {
    arrow = "/whiteArrow.svg"
    userImg = "/whiteUser.svg"
    text = "text-ourcolors-white"
    profileColor = "white"
  }
  return (
    <div className=" ml-3 bg-transparent h-12 w-[100%] fixed flex items-center justify-between px-[6%]">
      {link ? (
        <Link href={link}>
          <Image
            src={arrow}
            alt={"#"}
            width="33"
            height="21"
            className="h-[20px]"
          ></Image>
        </Link>
      ) : (
        <div></div>
      )}
      <h1 className={text}>
        {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
      </h1>
      <Link href={"/profile"}>
        {!user.firstName ? (
          <Image
            src={userImg}
            alt={"#"}
            width="20"
            height="22"
            style={{ width: "auto", height: "30px" }}
          ></Image>
        ) : (
          <UserCircle
            username={user.firstName}
            color={profileColor}
          ></UserCircle>
        )}
      </Link>
    </div>
  )
}

export default HeaderClear
