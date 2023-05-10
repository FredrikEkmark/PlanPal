export const tempSchedule = () => {
  return {
    id: "",
    userId: "",
    activites: [
      {
        id: "58383",
        calendarId: "fasjfja",
        date: new Date().toISOString().slice(0, 10) as string,
        startTime: "08:30",
        endTime: "10:30",
        name: "Preppa inför demo",
        description: "I skolan",
      },
      {
        id: "432423",
        calendarId: "fasjfja",
        date: new Date().toISOString().slice(0, 10) as string,
        startTime: "11:00",
        endTime: "12:00",
        name: "Demo",
        description: "Visa vår super app",
      },
      {
        id: "58383fs",
        calendarId: "fasjfja",
        date: new Date().toISOString().slice(0, 10) as string,
        startTime: "12:00",
        endTime: "13:30",
        name: "Lunch",
        description: "Ät Lunch",
      },
      {
        id: "438382",
        calendarId: "fasjfja",
        date: new Date("2023-05-11").toISOString().slice(0, 10) as string,
        startTime: "09:00",
        endTime: "09:30",
        name: "Standup",
        description: "",
      },
      {
        id: "938292",
        calendarId: "fasjfja",
        date: new Date("2023-05-11").toISOString().slice(0, 10) as string,
        startTime: "09:30",
        endTime: "12:00",
        name: "Börja på sprint 6",
        description: "",
      },
    ],
  }
}
