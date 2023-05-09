import { NextPage } from "next"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Main = ({ children }: Props) => {
  return <main className="w-screen h-screen pt-16 ">{children}</main>
}

export default Main
