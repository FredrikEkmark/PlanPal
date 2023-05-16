import { addCalActivFetch } from "@/functions/addCalActivFetch"
import { addTaskFetch } from "@/functions/addTaskFetch"
import { deleteTaskFetch } from "@/functions/deleteTaskFetch"
import { editTaskFetch } from "@/functions/editTaskFetch"
import { Activity, Calendar } from "@/types/calendar"
import { Task } from "@/types/task"
import { ToDo } from "@/types/toDo"
import { User } from "@/types/user"
import { ReactNode, useState, createContext } from "react"

// boilerplate
interface UserProviderProps {
  children: ReactNode
}

interface UserContextProps {
  user: User
  currentPage: string
  toDo: ToDo
  calendar: Calendar
  setUser: (user: User) => void
  setCurrentPage: (currentPage: string) => void
  setToDo: (toDo: ToDo) => void
  addTask: (categoryTitle: string, task: Task, user: User) => void
  editTask: (task: Task) => void
  deleteTask: (task: Task) => void
  setCalendar: (calendar: Calendar) => void
  addCalActivity: (user: User, activity: Activity) => void
}

// Default

const initialUser = {
  id: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
}

const initialCategory = [
  {
    title: "",
    id: "",
    color: "",
    toDoList: [],
  },
]

const initialCalendar = {
  id: "",
  userId: "",
  activites: [],
}

const initialUserContext: UserContextProps = {
  user: initialUser,
  currentPage: "",
  toDo: { category: initialCategory },
  calendar: initialCalendar,
  setUser: () => {},
  setCurrentPage: () => {},
  setToDo: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  setCalendar: () => {},
  addCalActivity: () => {},
}

export const UserContext = createContext<UserContextProps>(initialUserContext)

const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser)
  const [currentPage, setCurrentPage] = useState<string>("")
  const [toDo, setToDo] = useState<ToDo>({
    category: initialCategory,
  }) // This should be changed to Database later
  const [calendar, setCalendar] = useState<Calendar>(initialCalendar)

  // Connect
  const contextValue: UserContextProps = {
    user,
    currentPage,
    toDo,
    calendar,
    setUser: (user: User) => setUser(user),
    setCurrentPage: (currentPage: string) => setCurrentPage(currentPage),
    setToDo: (toDo: ToDo) => setToDo(toDo),
    setCalendar: (calendar: Calendar) => setCalendar(calendar),
    addTask: async (categoryTitle: string, task: Task) => {
      const postedTask = await addTaskFetch(task, user)
      const categoryIndex = toDo.category.findIndex(
        (category) => category.id === postedTask.categoryId
      )
      const updatedCategory = {
        ...toDo.category[categoryIndex],
        toDoList: [...toDo.category[categoryIndex].toDoList, postedTask],
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
    editTask: async (task: Task) => {
      const editedTask = await editTaskFetch(task, user)
      const categoryIndex = toDo.category.findIndex(
        (category) => category.id === task.categoryId
      )
      setToDo((toDo) => {
        const updatedToDoList = toDo.category[categoryIndex].toDoList.map(
          (existingTask) => {
            if (existingTask.id === editedTask.id) {
              return editedTask // replace existing task with updated task
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
      deleteTaskFetch(task, user)
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
    addCalActivity: async (user, activity) => {
      const newActivity = await addCalActivFetch(activity, user)
    },
  }
  return <UserContext.Provider value={contextValue} children={children} />
}

export default UserContextProvider
