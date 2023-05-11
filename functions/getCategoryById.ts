import { Category } from "@/types/category"
import { ToDo } from "@/types/toDo"

export function getCategoryById(toDo: ToDo, categoryId: string): Category {
  for (const category of toDo.category) {
    if (category.id === categoryId) {
      return category
    }
  }
  return { id: "", title: "", toDoList: [], color: "" }
}
