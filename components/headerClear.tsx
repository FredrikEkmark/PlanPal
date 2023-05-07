import Image from "next/image"
import Link from "next/link"

interface Props {
  currentPage: string
}

const HeaderClear = (props: Props) => {
  return (
    <div className=" bg-ourcolors-blue border-ourcolors-blue h-12 w-[100%] flex items-center justify-between px-[5%]">
      <Link href={"/toDo"}>
        <Image
          src={"/whiteArrow.svg"}
          alt={"#"}
          width="33"
          height="21"
          className="h-[20px]"
        ></Image>
      </Link>
      <h1 className="text-white ">
        {props.currentPage.charAt(0).toUpperCase() + props.currentPage.slice(1)}
      </h1>
      <Image
        src={"/whiteUser.svg"}
        alt={"#"}
        width="20"
        height="22"
        style={{ width: "auto", height: "30px" }}
      ></Image>
    </div>
  )
}

export default HeaderClear
