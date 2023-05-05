import Image from "next/image"
import Link from "next/link"

interface Props {
  currentPage: string
  link?: string
  bright?: boolean
}

const HeaderClear = ({ currentPage, link, bright }: Props) => {
  let arrow = "/blackArrow.svg"
  let user = "/user.svg"
  let text = "text-ourcolors-black"

  if (bright) {
    arrow = "/whiteArrow.svg"
    user = "/whiteUser.svg"
    text = "text-ourcolors-white"
  }
  return (
    <div className=" bg-transparent h-12 w-[100%] fixed flex items-center justify-between px-[5%]">
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
      <Image
        src={user}
        alt={"#"}
        width="20"
        height="22"
        style={{ width: "auto", height: "30px" }}
      ></Image>
    </div>
  )
}

export default HeaderClear
