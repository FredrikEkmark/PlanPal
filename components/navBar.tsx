import Link from "next/link"
import Image from "next/image"
import Box from "./basic/box"

interface Props {
  currentPage: string
}

const NavBar = (props: Props) => {
  return (
    <div className="@apply fixed bottom-0 py-2 px-4 flex justify-between mx-[5%] w-[90%] shadow-[2px_2px_10px] bg-white rounded-[15px] inset[0%] mb-[15px]">
      <Link href={"/"}>
        {props.currentPage === "home" ? (
          <div className=" bg-ourcolors-purple rounded-[8px] p-[5px]">
            <Image
              src={"/homeWhite.svg"}
              alt={"#"}
              width={"40"}
              height={"40"}
            ></Image>
          </div>
        ) : (
          <div className="rounded-[8px] p-[5px]">
            <Image
              src={"/home.svg"}
              alt={"#"}
              width={"40"}
              height={"40"}
            ></Image>
          </div>
        )}
      </Link>
      <Link href={"/calendar"}>
        {props.currentPage === "calendar" ? (
          <div className=" bg-ourcolors-purple rounded-[8px] p-[5px]">
            <Image
              src={"/calendarWhite.svg"}
              alt={"#"}
              width={"40"}
              height={"40"}
            ></Image>
          </div>
        ) : (
          <div className="rounded-[8px] p-[5px]">
            <Image
              src={"/calendar.svg"}
              alt={"#"}
              width={"40"}
              height={"40"}
            ></Image>
          </div>
        )}
      </Link>
      <Link href={"/toDo"}>
        {props.currentPage === "todo" ? (
          <div className="  bg-ourcolors-purple rounded-[8px] p-[5px]">
            <Image
              src={"/checkCircleWhite.svg"}
              alt={"#"}
              width={"40"}
              height={"40"}
            ></Image>
          </div>
        ) : (
          <div className=" rounded-[8px] p-[5px]">
            <Image
              src={"/checkCircle.svg"}
              alt={"#"}
              width={"40"}
              height={"40"}
            ></Image>
          </div>
        )}
      </Link>
    </div>
  )
}

export default NavBar
