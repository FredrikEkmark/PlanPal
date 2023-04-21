/*
Query like this: 
URL: /api/task/task?id=<TASKID>  
AUTH Basic: username: email, password: password
BODY: {
    "title": string,
    "description": string | null,
    "date": Date, (show as "2000-12-04T00:00:00.000Z")
    "categoryId": string
}
METHODE: GET, POST, PATCH, DELETE
COMMENT: POST Dosn't require ?id=<TASKID>, GET, DELETE Dosn't require BODY
*/

import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../client"

type TaskBody = {
  title: string | undefined
  description: string | undefined
  done: boolean | undefined
  date: Date | undefined
  categoryId: string | undefined
}

type TaskImport = {
  id: string
  title: string
  description: string
  date: Date
  done: boolean
  categoryId: string
}

type Data = {
  result: TaskImport | string
}

async function main(
  id: string | undefined,
  email: string,
  password: string,
  body: TaskBody | undefined,
  method: string | undefined
) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  })

  if (!(user?.password === password)) {
    return "NOT AUTHORIZED"
  }

  switch (method) {
    case "GET": {
      if (id == undefined) {
        return "Id not provided"
      }
      const task = await prisma.task.findUnique({
        where: { id: id },
      })
      if (!task) {
        return "ERROR no Task"
      }
      const category = await prisma.category.findUnique({
        where: { id: task.categoryId },
      })
      if (!category) {
        return "ERROR no Category"
      }
      if (category.userId !== user.id) {
        return "NOT AUTHORIZED"
      }
      return task
    }
    case "POST": {
      if (!body?.title) {
        return "title is required in Body"
      } else if (!body?.date) {
        return "date is required in Body"
      } else if (!body?.categoryId) {
        return "categoryId is required in Body"
      }

      const category = await prisma.category.findUnique({
        where: { id: body.categoryId },
      })
      if (!category) {
        return "ERROR error no Category second"
      }
      if (category.userId !== user.id) {
        return "NOT AUTHORIZED"
      }

      const postBody = {
        data: {
          title: body.title,
          description: body.description,
          date: body.date,
          categoryId: body.categoryId,
        },
      }
      const task = await prisma.task.create(postBody)
      if (!task) {
        return "ERROR no Task"
      }
      return task
    }
    case "PATCH": {
      if (id == undefined) {
        return "Id not provided"
      }

      const task = await prisma.task.findUnique({
        where: { id: id },
      })

      if (!task) {
        return "ERROR"
      }

      const category = await prisma.category.findUnique({
        where: { id: task.categoryId },
      })

      if (!category) {
        return "ERROR"
      }

      if (category.userId !== user.id) {
        return "NOT AUTHORIZED"
      }

      let title = ""
      let description: string | null = null
      let done: boolean = false
      let date: Date = task.date

      if (!body?.title) {
        title = task.title
      } else {
        title = body.title
      }
      if (!body?.description) {
        description = task.description
      } else {
        description = body.description
      }
      if (body && body.done !== undefined) {
        done = body.done
      } else {
        done = task.done
      }
      if (!body?.date) {
        date = task.date
      } else {
        date = body.date
      }

      const postBody = {
        where: { id: id },
        data: {
          title: title,
          description: description,
          done: done,
          date: date,
          categoryId: category.id,
        },
      }
      const updatedTask = await prisma.task.update(postBody)
      if (!updatedTask) {
        return "ERROR"
      }
      return updatedTask
    }
    case "DELETE": {
      if (id == undefined) {
        return "Id not provided"
      }
      const task = await prisma.task.findUnique({
        where: { id: id },
      })
      if (!task) {
        return "ERROR"
      }

      const category = await prisma.category.findUnique({
        where: { id: task.categoryId },
      })

      if (!category) {
        return "ERROR"
      }

      if (category.userId !== user.id) {
        return "NOT AUTHORIZED"
      }

      const deleteTask = await prisma.task.delete({
        where: { id: id },
      })
      if (!deleteTask) {
        return "ERROR"
      }
      return deleteTask
    }
    default: {
      return `Method ${method} Not Allowed`
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ result: "Missing Authorization header" })
  }

  const authType = authHeader.split(" ")[0]
  const authValue = authHeader.split(" ")[1]

  if (authType !== "Basic") {
    return res.status(401).json({ result: "Invalid Authorization type" })
  }

  const [email, password] = Buffer.from(authValue, "base64")
    .toString()
    .split(":")

  const { id } = req.query
  const body = req.body

  const result = await main(
    id as string,
    email,
    password,
    body as TaskBody,
    req.method
  )
  if (result) {
    res.status(200).json({ result: JSON.parse(JSON.stringify(result)) })
  } else {
    res.status(500).json({ result: "No Tasks found" })
  }
}
