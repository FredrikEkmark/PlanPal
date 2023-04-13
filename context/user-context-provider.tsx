import { Calendar } from "@/types/calendar"
import { Category } from "@/types/category"
import { Task } from "@/types/task"
import { ToDo } from "@/types/toDo"
import { ReactNode, useState, createContext } from "react"

// boilerplate
interface UserProviderProps {
  children: ReactNode
}

interface UserContextProps {
  username: string
  currentPage: string
  toDo: ToDo
  calendar: Calendar
  setUsername: (username: string) => void
  setCurrentPage: (currentPage: string) => void
  setToDo: (toDo: ToDo) => void
  addTask: (categoryIndex: number, task: Task) => void
  editTask: (categoryIndex: number, task: Task) => void
  deleteTask: (categoryIndex: number, task: Task) => void
  setCalendar: (calendar: Calendar) => void
}

// Default

const initialUserContext: UserContextProps = {
  username: "",
  currentPage: "",
  toDo: { category: [] },
  calendar: { id: 0 },
  setUsername: () => {},
  setCurrentPage: () => {},
  setToDo: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  setCalendar: () => {},
}

export const UserContext = createContext<UserContextProps>(initialUserContext)

const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<string>("")
  const [toDo, setToDo] = useState<ToDo>({ category: [] }) // This should be changed to Database later
  const [calendar, setCalendar] = useState<Calendar>({ id: 0 })

  // Connect
  const contextValue: UserContextProps = {
    username,
    currentPage,
    toDo,
    calendar,
    setUsername: (username: string) => setUsername(username),
    setCurrentPage: (currentPage: string) => setCurrentPage(currentPage),
    setToDo: (toDo: ToDo) => setToDo(toDo),
    setCalendar: (calendar: Calendar) => setCalendar(calendar),
    addTask: (categoryIndex: number, task: Task) => {
      setToDo((toDo) => ({
        ...toDo,
        tasks: [...toDo.category[categoryIndex].toDoList, task],
      }))
    },
    editTask: (categoryIndex: number, task: Task) => {
      setToDo((toDo) => ({
        ...toDo,
        tasks: [...toDo.category[categoryIndex].toDoList, task],
      }))
    },
    deleteTask: (categoryIndex: number, task: Task) => {
      setToDo((toDo) => ({
        ...toDo,
        tasks: [...toDo.category[categoryIndex].toDoList, task],
      }))
    },
  }
  return <UserContext.Provider value={contextValue} children={children} />
}

export default UserContextProvider
