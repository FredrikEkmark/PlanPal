import Header from "@/components/header"
import NavBar from "@/components/navBar"
import AddCategoryCard from "@/components/toDo/addCategoryCard"
import { NextPage } from "next"

interface Props {}

const AddCategory: NextPage<Props> = ({}) => {
  return (
    <div>
      <Header currentPage={"Create new category"} />
      <AddCategoryCard />
      <NavBar currentPage={"Add Category Card"} />
    </div>
  )
}

export default AddCategory
