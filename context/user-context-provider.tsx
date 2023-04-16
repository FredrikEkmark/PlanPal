import { Calendar } from "@/types/calendar"
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
  addTask: (categoryTitle: string, task: Task) => void
  editTask: (task: Task) => void
  deleteTask: (task: Task) => void
  setCalendar: (calendar: Calendar) => void
}

// Default

const initialCategory = [
  {
    title: "Skola",
    id: "1",
    color: "",
    toDoList: [
      {
        date: new Date().toISOString().slice(0, 10),
        id: "1",
        categoryId: "1",
        title: "Test",
        description: "des test",
        done: true,
      },
    ],
  },
  {
    title: "Fritid",
    id: "2",
    color: "",
    toDoList: [
      {
        date: "2000-12-12",
        id: "2",
        categoryId: "2",
        title: "Test",
        description: "des test",
        done: false,
      },
    ],
  },
  {
    title: "Övrigt",
    id: "3",
    color: "",
    toDoList: [
      {
        date: "2030-12-12",
        id: "3",
        categoryId: "3",
        title: "Test",
        description: "des test",
        done: false,
      },
    ],
  },
]

const initialUserContext: UserContextProps = {
  username: "",
  currentPage: "",
  toDo: { category: initialCategory },
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
  const [toDo, setToDo] = useState<ToDo>({
    category: initialCategory,
  }) // This should be changed to Database later
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
    addTask: (categoryTitle: string, task: Task) => {
      const categoryIndex = toDo.category.findIndex(
        (category) => category.title === categoryTitle
      )
      const updatedCategory = {
        ...toDo.category[categoryIndex],
        toDoList: [...toDo.category[categoryIndex].toDoList, task],
      }
      const updatedCategories = [
        ...toDo.category.slice(0, categoryIndex),
        updatedCategory,
        ...toDo.category.slice(categoryIndex + 1),
      ]
      setToDo({
        ...toDo,
        category: updatedCategories,
      })
    },
    editTask: (task: Task) => {
      const categoryIndex = toDo.category.findIndex(
        (category) => category.id === task.categoryId
      )
      setToDo((toDo) => {
        const updatedToDoList = toDo.category[categoryIndex].toDoList.map(
          (existingTask) => {
            if (existingTask.id === task.id) {
              return task // replace existing task with updated task
            }
            return existingTask
          }
        )
        const updatedCategory = {
          ...toDo.category[categoryIndex],
          toDoList: updatedToDoList,
        }
        const updatedCategories = [...toDo.category]
        updatedCategories[categoryIndex] = updatedCategory
        return {
          ...toDo,
          category: updatedCategories,
        }
      })
    },
    deleteTask: (task: Task) => {
      const categoryIndex = toDo.category.findIndex(
        (category) => category.id === task.categoryId
      )
      setToDo((toDo) => {
        const updatedToDoList = toDo.category[categoryIndex].toDoList.filter(
          (existingTask) => existingTask.id !== task.id // filter out task to delete
        )
        const updatedCategory = {
          ...toDo.category[categoryIndex],
          toDoList: updatedToDoList,
        }
        const updatedCategories = [...toDo.category]
        updatedCategories[categoryIndex] = updatedCategory
        return {
          ...toDo,
          category: updatedCategories,
        }
      })
    },
  }
  return <UserContext.Provider value={contextValue} children={children} />
}

export default UserContextProvider
