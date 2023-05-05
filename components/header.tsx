import Image from "next/image"

interface Props {
  currentPage: string
}

const Header = (props: Props) => {
  return (
    <div className="bg-white h-12 w-[100%] flex items-center justify-between px-[5%]">
      <Image src={"/hamburger.svg"} alt={"#"} width="33" height="21"></Image>
      <h1 className="text-black ">
        {props.currentPage.charAt(0).toUpperCase() + props.currentPage.slice(1)}
      </h1>
      <Image
        src={"/user.svg"}
        alt={"#"}
        width="20"
        height="22"
        style={{ width: "auto", height: "30px" }}
      ></Image>
    </div>
  )
}

export default Header
