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
          <div className=" rounded-[8px] p-[5px]">
            <Image
              src={"/blueHome.svg"}
              alt={"#"}
              width={"25"}
              height={"24"}
              style={{ width: "auto", height: "38px" }}
            ></Image>
          </div>
        ) : (
          <div className="rounded-[8px] p-[5px]">
            <Image
              src={"/home.svg"}
              alt={"#"}
              width={"25"}
              height={"24"}
              style={{ width: "auto", height: "38px" }}
            ></Image>
          </div>
        )}
      </Link>
      <Link href={"/calendar"}>
        {props.currentPage === "calendar" ? (
          <div className=" rounded-[8px] p-[5px]">
            <Image
              src={"/blueCalendar.svg"}
              alt={"#"}
              width={"18"}
              height={"18"}
              style={{ width: "auto", height: "38px" }}
            ></Image>
          </div>
        ) : (
          <div className="rounded-[8px] p-[5px]">
            <Image
              src={"/calendar.svg"}
              alt={"#"}
              width={"18"}
              height={"18"}
              style={{ width: "auto", height: "38px" }}
            ></Image>
          </div>
        )}
      </Link>
      <Link href={"/toDo"}>
        {props.currentPage === "todo" ? (
          <div className=" rounded-[8px] p-[5px]">
            <Image
              src={"/blueCheck.svg"}
              alt={"#"}
              width={"24"}
              height={"24"}
              style={{ width: "auto", height: "38px" }}
            ></Image>
          </div>
        ) : (
          <div className=" rounded-[8px] p-[5px]">
            <Image
              src={"/checkCircle.svg"}
              alt={"#"}
              width={"24"}
              height={"24"}
              style={{ width: "auto", height: "38px" }}
            ></Image>
          </div>
        )}
      </Link>
    </div>
  )
}

export default NavBar
