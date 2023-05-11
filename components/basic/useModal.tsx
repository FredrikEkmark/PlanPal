import { useState } from "react"

export default function useModal() {
  const [isOpen, setisOpen] = useState(false)

  const toggle1 = () => {
    setisOpen(!isOpen)
  }

  return {
    isOpen,
    toggle1,
  }
}
