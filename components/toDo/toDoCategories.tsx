import { Category } from "@/types/category"
import CategoryBox from "../basic/categoryBox"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Props {
  categorys: Category[]
}

const ToDoCategories = (props: Props) => {
  const [categoryList, setCategoryList] = useState(props.categorys)

  const [now, setNow] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    // Update the state with the new category list
    setNow(new Date().toISOString().slice(0, 10)) // Get today's date in the format YYYY-MM-DD
    setCategoryList(props.categorys)
  }, [props.categorys])

  const categoryCards = categoryList.map((categories) => (
    <CategoryBox
      href={`/toDo/category/${categories.title}`}
      key={categories.title}
    >
      <h2>{categories.title}</h2>
      <p className="text-ourcolors-purple">
        {
          categories.toDoList.filter(
            (task) => task.date >= now || task.done === false
          ).length
        }{" "}
        Tasks
      </p>
    </CategoryBox>
  ))

  return (
    <div className="mx-[5%] ">
      <h2>Lists</h2>
      <div className="flex flex-wrap justify-between">
        <CategoryBox className="" href="/toDo/category/all">
          <h2>All Tasks</h2>
          <p className="text-ourcolors-purple">
            {props.categorys.reduce(
              (total, category) =>
                total +
                category.toDoList.filter(
                  (task) => task.date >= now || task.done === false
                ).length,
              0
            )}{" "}
            Tasks
          </p>
        </CategoryBox>
        {categoryCards}
        <CategoryBox href="/toDo/addCategory">
          <div className="flex">
            <Image
              className="pr-2"
              src={"/plusPurple.svg"}
              alt={"#"}
              height={"21"}
              width={"21"}
            ></Image>
            New List
          </div>
        </CategoryBox>
      </div>
    </div>
  )
}

export default ToDoCategories
