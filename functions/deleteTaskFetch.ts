import { Task } from "@/types/task"
import { User } from "@/types/user"

export async function deleteTaskFetch(task: Task, user: User): Promise<Task> {
  const username = user.email
  const password = user.password
  const authHeader = `Basic ${btoa(`${username}:${password}`)}`

  console.log(task)

  const headers = {
    "Content-Type": "application/json",
    Authorization: authHeader,
  }

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: headers,
    credentials: "include" as RequestCredentials,
  }

  const url =
    "../".repeat(window.location.pathname.split("/").length - 2) +
    `/api/task/task?id=${task.id}`

  const res = await fetch(url, requestOptions)
  const json = await res.json()
  const data = JSON.parse(JSON.stringify(json))

  if (data.result.success) {
    const date = new Date(data.result.body.date as string)
      .toISOString()
      .slice(0, 10)

    const editedTask: Task = {
      date: date,
      id: data.result.body.id as string,
      categoryId: data.result.body.categoryId as string,
      title: data.result.body.title as string,
      description: data.result.body.description as string | null,
      done: data.result.body.done as boolean,
    }

    return editedTask
  }
  console.log(data.result.error)
  return data.result.success
}
