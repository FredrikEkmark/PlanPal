import { Activity } from "@/types/calendar"
import { User } from "@/types/user"

type Result = {
  success: boolean
  error?: string
  body?: any
}

export async function addTaskFetch(
  activityId: string,
  updatedActivity: Activity,
  user: User
): Promise<Result> {
  const username = user.email
  const password = user.password
  const authHeader = `Basic ${btoa(`${username}:${password}`)}`

  const updatedBody = {
    date: updatedActivity.date,
    startTime: updatedActivity.startTime,
    endTime: updatedActivity.endTime,
    name: updatedActivity.name,
    ...(updatedActivity.description && {
      description: updatedActivity.description,
    }),
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: authHeader,
  }

  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(updatedBody),
    credentials: "include" as RequestCredentials,
  }

  const url =
    "../".repeat(window.location.pathname.split("/").length - 2) +
    `/api/calendar/activity?id=${activityId}`

  const res = await fetch(url, requestOptions)
  const json = await res.json()
  const data = JSON.parse(JSON.stringify(json.result))

  const success =
    data.name === updatedActivity.name &&
    data.startTime === updatedActivity.startTime &&
    data.endTime === updatedActivity.endTime &&
    data.date === updatedActivity.date

  if (success) {
    return {
      success: success,
      body: data,
    }
  } else {
    return {
      success: success,
      error: data.error,
      body: data.body,
    }
  }
}
