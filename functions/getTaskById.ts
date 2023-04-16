import { Task } from "@/types/task"
import { ToDo } from "@/types/toDo"

export function getTaskById(toDo: ToDo, taskId: string): Task {
  for (const category of toDo.category) {
    for (const task of category.toDoList) {
      if (task.id === taskId) {
        return task
      }
    }
  }
  return {
    title: "",
    description: "",
    categoryId: "",
    id: "",
    date: "",
    done: false,
  }
}
