import { Activity } from "@/types/calendar"
import { User } from "@/types/user"

type Result = {
  success: boolean
  error?: string
  body?: any
}

export async function deleteCalActivFetch(
  activityId: string,
  user: User
): Promise<Result> {
  const username = user.email
  const password = user.password
  const authHeader = `Basic ${btoa(`${username}:${password}`)}`

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
    `/api/calendar/activity?id=${activityId}`

  const res = await fetch(url, requestOptions)
  const json = await res.json()
  const data = JSON.parse(JSON.stringify(json))

  const success = data.id === activityId

  if (success) {
    return {
      success: success,
      body: data.body,
    }
  } else {
    return {
      success: success,
      error: data.error,
      body: data.body,
    }
  }
}
