export type Calendar = {
  id: string
  userId: string
  activites: Activity[]
}

export type Activity = {
  id: string
  calendarId: string
  date: string | any
  startTime: string
  endTime: string
  name: string
  description?: string
}
