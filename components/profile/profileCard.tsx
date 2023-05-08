import { User } from "@/types/user"

import Image from "next/image"

interface Props {
  user: User
  logout: () => void
}

const ProfileCard = ({ user, logout }: Props) => {
  return (
    <div>
      <div className="flex justify-center w-full pt-12">
        <p className="text-hm">{user.firstName}</p>
      </div>
      <div className="flex flex-col w-full p-[5%] border-t-2 my-2">
        <button
          onClick={logout}
          className="flex items-center text-ourcolors-red text-hs"
        >
          <Image
            className="mr-2"
            src={"/logout.svg"}
            alt={"#"}
            width={20}
            height={18}
          />
          Log out
        </button>
      </div>
    </div>
  )
}

export default ProfileCard
