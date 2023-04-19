import { Task } from "./task"

export type Category = {
  id: string
  title: string
  color: string | undefined | null
  toDoList: Task[]
}
