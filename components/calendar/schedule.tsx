import { Calendar } from "@/types/calendar"
import TaskBoxCard from "../basic/taskBoxCard"
import { useEffect, useRef } from "react"
import Image from "next/image"

interface Props {
  calendar: Calendar
  date: Date
  toggle: boolean
  setToggled: (toogle: boolean) => void
}

const Schedule = ({ calendar, date, setToggled, toggle }: Props) => {
  const currentTimeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to the current time div when the component mounts
    if (currentTimeRef.current) {
      currentTimeRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleToggle = () => {
    setToggled(!toggle)
  }

  const hours = () => {
    const hours = []

    for (let i = 0; i < 24; i++) {
      hours.push(
        <div key={i} className="h-16">
          <div>{i}:00</div>
        </div>
      )
    }

    return <div className="mb-3">{hours}</div>
  }

  const hourlySchedule = () => {
    const hours = []
    const datesActivities = calendar.activites.filter(
      (activity) =>
        activity.date === (date.toISOString().slice(0, 10) as string)
    )

    const now = new Date()
    const nowHour = now.getHours()
    const nowMinute = Math.floor(now.getMinutes() / 10) * 10
    const currentBlock = Math.floor(nowHour * 2 + nowMinute / 30)

    for (let i = 0; i < 48; i++) {
      let border = ""
      if (i % 2 === 0) {
        border = "border-t-2 border-ourcolors-font"
      }

      let activity

      if (datesActivities) {
        const currentHour = Math.floor(i / 2)
        const currentMinute = (i % 2) * 30

        activity = datesActivities.find((activity) => {
          const [hour, minute] = activity.startTime.split(":")
          return (
            parseInt(hour) === currentHour && parseInt(minute) === currentMinute
          )
        })
      }

      let info = (
        <>
          <h3 className="text-bl text-ourcolors-black">{activity?.name}</h3>
        </>
      )
      let blockCount = 0
      if (activity) {
        const startTime = new Date(
          `${date.toISOString().slice(0, 10) as string}T${
            activity.startTime
          }:00`
        )
        const endTime = new Date(
          `${date.toISOString().slice(0, 10) as string}T${activity.endTime}:00`
        )
        const diff = endTime.getTime() - startTime.getTime()
        blockCount = Math.ceil(diff / 1800000)

        if (blockCount > 2) {
          info = (
            <>
              <p className="text-bm text-ourcolors-purple">
                {activity.startTime} - {activity.endTime}
              </p>
              <h3 className="text-bl text-ourcolors-black">{activity.name}</h3>
              <p className="text-bm text-ourcolors-font">
                {activity.description}
              </p>
            </>
          )
        } else if (blockCount > 1) {
          info = (
            <>
              <h3 className="text-bl text-ourcolors-black">{activity.name}</h3>
              <p className="text-bm text-ourcolors-font">
                {activity.description}
              </p>
            </>
          )
        }
      }

      let blocks

      switch (blockCount) {
        case 1:
          blocks = "h-8"
          break
        case 2:
          blocks = "h-16"
          break
        case 3:
          blocks = "h-24"
          break
        case 4:
          blocks = "h-32"
          break
        case 5:
          blocks = "h-40"
          break
        case 6:
          blocks = "h-48"
          break
        default:
          blocks = "h-8"
      }

      const isCurrentTime = i === currentBlock

      let tenMinInterval = "pt-4"

      switch (nowMinute) {
        case 0:
        case 30:
          tenMinInterval = "pt-0"
          break
        case 10:
        case 40:
          tenMinInterval = "pt-3"
          break
        case 20:
        case 50:
          tenMinInterval = "pt-6"
          break
      }

      hours.push(
        <>
          {activity ? (
            <div className="relative flex justify-center">
              <div key={i} className={`${border} h-8 w-full `}>
                {isCurrentTime ? (
                  <div
                    ref={currentTimeRef}
                    className={`w-full ${tenMinInterval}`}
                  >
                    <div className="w-full border-t-4 border-ourcolors-purple"></div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className={` ${blocks} absolute top-0 bg-white  w-4/5 rounded-xl border-2 border-ourcolors-purple px-2`}
              >
                {info}
              </div>
            </div>
          ) : (
            <div key={i} className={`${border} h-8 w-full `}>
              {isCurrentTime ? (
                <div
                  ref={currentTimeRef}
                  className={`w-full overflow-y-scroll ${tenMinInterval}`}
                >
                  <div className="w-full border-t-4 border-ourcolors-purple"></div>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </>
      )
    }

    return <div className="mt-3">{hours}</div>
  }

  const toggleSize = () => {
    if (toggle) {
      return "max-h-[100%]"
    }
    return "max-h-[60%]"
  }

  return (
    <TaskBoxCard
      className={`flex flex-col w-screen ${toggleSize()}  overflow-hidden`}
    >
      <button onClick={handleToggle} className="self-center">
        <Image src={"/upLine.svg"} alt={"#"} width={60} height={5}></Image>
      </button>
      <h2 className="mb-2 justify-self-start">{date.toDateString()}</h2>
      <div className="flex flex-row justify-between w-full h-screen mb-16 overflow-y-auto">
        <div className="w-[15%] flex flex-col">{hours()}</div>
        <div className="w-[80%]">{hourlySchedule()}</div>
      </div>
    </TaskBoxCard>
  )
}

export default Schedule
