import { Activity } from "@/types/calendar"
import { User } from "@/types/user"

type Result = {
  success: boolean
  error?: string
  body?: any
}

export async function addTaskFetch(
  activity: Activity,
  user: User
): Promise<Result> {
  const username = user.email
  const password = user.password
  const authHeader = `Basic ${btoa(`${username}:${password}`)}`

  const postBody = {
    date: activity.date,
    startTime: activity.startTime,
    endTime: activity.endTime,
    name: activity.name,
    ...(activity.description && { description: activity.description }),
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: authHeader,
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(postBody),
    credentials: "include" as RequestCredentials,
  }

  const url =
    "../".repeat(window.location.pathname.split("/").length - 2) +
    `/api/calendar/activity`

  const res = await fetch(url, requestOptions)
  const json = await res.json()
  const data = JSON.parse(JSON.stringify(json.result))

  const success =
    data.name === activity.name &&
    data.startTime === activity.startTime &&
    data.endTime === activity.endTime &&
    data.date === activity.date

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
