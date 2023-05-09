import { NextPage } from "next"

interface Props {}

const DashboardCalendar: NextPage<Props> = ({}) => {
  return (
    <>
      <p className="mb-2 ml-6 text-hm">Calendar</p>

      <div className="slides">
        <div id="slide-1">
          <p className="ml-2 text-hxs">9:00 - 11:00</p>
          <p className="ml-2 mt-7 text-hm">Möte med SYV</p>
          <p className="ml-2 text-hxs">Hantverkarvägen 2</p>
        </div>
        <div id="slide-2"></div>
        <div id="slide-3"></div>
        <div id="slide-4"></div>
        <div id="slide-5"></div>
      </div>
    </>
  )
}

export default DashboardCalendar
