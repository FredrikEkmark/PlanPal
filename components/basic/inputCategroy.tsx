import { useState } from "react"
import Image from "next/image"
import { Category } from "@/types/category"

interface Props {
  initialValue: string
  categories: Category[]
  onChange: (value: string) => void
}

const InputCategory = (props: Props) => {
  const [value, setValue] = useState(props.initialValue)

  const categoryOptions = props.categories.map((categories) => (
    <option key={categories.title} value={categories.title}>
      {categories.title}
    </option>
  ))

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = event.target.value
    setValue(newValue)
    props.onChange(newValue)
  }

  return (
    <div className="flex p-2 border-2 rounded-[10px]">
      <label className="flex text-ourcolors-font" htmlFor="categoryInput">
        <Image src="/label.svg" alt={"#"} width={"20"} height={"20"}></Image>
        <p className="px-1"></p>
        {"Category"}:{" "}
      </label>
      <select
        name="categoryInput"
        id="categoryInput"
        value={value}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {categoryOptions}
      </select>
    </div>
  )
}

export default InputCategory
