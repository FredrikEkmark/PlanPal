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
  title: string
  description: string | undefined
  done: boolean | undefined
  date: Date
  categoryId: string
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
  result: {
    success: boolean
    error: string
    body?: TaskImport
  }
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
    return {
      success: false,
      error: "NOT AUTHORIZED",
    }
  }
  try {
    switch (method) {
      // GET
      case "GET": {
        if (id == undefined) {
          return {
            success: false,
            error: "Id not provided",
          }
        }
        const task = await prisma.task.findUnique({
          where: { id: id },
        })
        if (!task) {
          return {
            success: false,
            error: "ERROR no Task",
          }
        }
        const category = await prisma.category.findUnique({
          where: { id: task.categoryId },
        })
        if (!category) {
          return {
            success: false,
            error: "ERROR no Category",
          }
        }
        if (category.userId !== user.id) {
          return {
            success: false,
            error: "NOT AUTHERIZED",
          }
        }
        return {
          success: true,
          body: task,
        }
      }
      // POST
      case "POST": {
        let success = true
        let error = "is required in Body"

        if (!body?.date) {
          success = false
          error = "date, " + error
        }
        if (!body?.title) {
          success = false
          error = "title, " + error
        }
        if (!body?.categoryId) {
          success = false
          error = "categoryId, " + error
        }

        if (!success) {
          return {
            success: success,
            error: error,
          }
        }

        if (!body) {
          return { success: false, error: "Body is required" }
        }

        const category = await prisma.category.findUnique({
          where: { id: body.categoryId },
        })

        if (!category) {
          return {
            success: false,
            error: "ERROR no Category",
          }
        }
        if (category.userId !== user.id) {
          return {
            success: false,
            error: "NOT AUTHERIZED",
          }
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
          return {
            success: false,
            error: "ERROR no Task",
          }
        }
        return {
          success: true,
          body: task,
        }
      }
      // PATCH
      case "PATCH": {
        if (id == undefined) {
          return {
            success: false,
            error: "Id not provided",
          }
        }

        const task = await prisma.task.findUnique({
          where: { id: id },
        })

        if (!task) {
          return {
            success: false,
            error: "Error no task found",
          }
        }

        const category = await prisma.category.findUnique({
          where: { id: task.categoryId },
        })

        if (!category) {
          return {
            success: false,
            error: "ERROR no Category",
          }
        }

        if (category.userId !== user.id) {
          return {
            success: false,
            error: "NOT AUTHORIZED",
          }
        }

        if (!body) {
          return { success: false, error: "Body is required" }
        }

        let title = task.title
        let description = task.description
        let done = task.done
        let date = task.date

        if (body.title) {
          title = body.title
        }
        if (body.description) {
          description = body.description
        }
        if (!(body.done === undefined)) {
          done = body.done
        }
        if (body.date) {
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

        console.log("PostBody: " + postBody)
        const updatedTask = await prisma.task.update(postBody)
        if (!updatedTask) {
          return {
            success: false,
            error: "Error while patching task",
          }
        }
        console.log("updatedTask: " + updatedTask)
        return {
          success: true,
          body: updatedTask,
        }
      }
      // DELETE
      case "DELETE": {
        if (id == undefined) {
          return {
            success: false,
            error: "Id not provided",
          }
        }
        const task = await prisma.task.findUnique({
          where: { id: id },
        })
        if (!task) {
          return {
            success: false,
            error: "ERROR no task",
          }
        }

        const category = await prisma.category.findUnique({
          where: { id: task.categoryId },
        })

        if (!category) {
          return {
            success: false,
            error: "ERROR no category",
          }
        }

        if (category.userId !== user.id) {
          return {
            success: false,
            error: "NOT AUTHORIZED",
          }
        }

        const deleteTask = await prisma.task.delete({
          where: { id: id },
        })
        if (!deleteTask) {
          return {
            success: false,
            error: "Error while deleting task",
          }
        }
        return {
          success: true,
          body: deleteTask,
        }
      }
      default: {
        return {
          success: false,
          error: `Method ${method} Not Allowed`,
        }
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      result: {
        success: false,
        error: "Missing Authorization header",
      },
    })
  }

  const authType = authHeader.split(" ")[0]
  const authValue = authHeader.split(" ")[1]

  if (authType !== "Basic") {
    return res.status(401).json({
      result: {
        success: false,
        error: "Invalid Authorization type",
      },
    })
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
    if (result.success) {
      res.status(200).json({ result: JSON.parse(JSON.stringify(result)) })
    } else {
      res.status(400).json({ result: JSON.parse(JSON.stringify(result)) })
    }
  } else {
    res.status(500).json({
      result: {
        success: false,
        error: "Server failure",
      },
    })
  }
}
