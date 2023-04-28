import { NextPage } from "next"
import InputCategory from "../basic/inputCategroy"
import Button from "../basic/button"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/user-context-provider"
import { Category } from "@/types/category"
import Box from "../basic/box"
import DoubleTextInput from "../basic/doubleTextInput"
import Link from "next/link"

const AddCategoryCard = ({}) => {
  //setters and getters for categoryInput
  const [categoryInput, setCategoryInput] = useState<string>("")

  function handleCategoryInput(newValue: string) {
    setCategoryInput(newValue)
  }

  //setters and getters for colorInput
  const [colorInput, setColorInput] = useState<string>("")

  function handleColorInput(newValue: string) {
    setColorInput(newValue)
  }

  //function that saves the inputs as a new category
  function handleSubmit() {
    const editCategory = {
      title: categoryInput,
      color: colorInput,
    }
  }

  return (
    <div>
      {/* Box with inputfields, currently has the wrong descriptions */}
      <Box>
        <DoubleTextInput
          initialValueTop={categoryInput}
          initialValueBottom={colorInput}
          onChangeTop={handleCategoryInput}
          onChangeBottom={handleColorInput}
        />
      </Box>
      {/* Box with button */}
      <div className="flex flex-row justify-around w-full">
        <Link href={"/toDo"}>
          <Button
            className="my-4 mt-8 w-[100px]"
            onClick={handleSubmit}
            color={"blue"}
          >
            Save Category
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default AddCategoryCard

// gör en till input för color - KLAR
// copiera in knapp - KLAR
// copiera in editTask - Gör så att den sparar ny category
