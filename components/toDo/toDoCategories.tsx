import { Category } from "@/types/category"
import CategoryBox from "../basic/categoryBox"
import { useEffect, useState } from "react"

interface Props {
  categorys: Category[]
}

const ToDoCategories = (props: Props) => {
  const [categoryList, setCategoryList] = useState(props.categorys)

  useEffect(() => {
    // Update the state with the new category list
    setCategoryList(props.categorys)
  }, [props.categorys])

  const categoryCards = categoryList.map((categories) => (
    <CategoryBox
      href={`/toDo/category/${categories.title}`}
      key={categories.title}
    >
      {categories.title}
      <br />
      {categories.toDoList.length}
    </CategoryBox>
  ))

  return (
    <div className="m-[5%] ">
      <h2>Lists</h2>
      <div className="flex flex-wrap justify-between">
        <CategoryBox href="/toDo/category/all">
          All Tasks <br />
          {props.categorys.reduce(
            (total, category) => total + category.toDoList.length,
            0
          )}
        </CategoryBox>
        {categoryCards}
        <CategoryBox href="/toDo/addCategory">New List</CategoryBox>
      </div>
    </div>
  )
}

export default ToDoCategories
