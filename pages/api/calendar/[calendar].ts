/*
Query like this: 
URL: /api/category/category?id=<CATEGORYID>  
AUTH Basic: username: email, password: password
BODY: {
  "title": string,
  "color": string | null
}
METHODE: GET, POST, PATCH, DELETE
COMMENT: POST Dosn't require ?id=<CATEGORYID>, GET, DELETE Dosn't require BODY
*/

import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../client"

type ActivityBody = {
  date: string
  startTime: string
  endTime: string
  name: string
  description: string | undefined
}

type ActivityImport = {
  id: string
  userId: string
  date: string
  startTime: string
  endTime: string
  name: string
  description: string
}

type Data = {
  result: {
    success: boolean
    error?: string
    body?: ActivityImport[]
  }
}

async function main(
  id: string | undefined,
  email: string,
  password: string,
  body: ActivityBody | undefined,
  method: string | undefined
) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  })

  if (!(user?.password === password)) {
    return {
      success: false,
      error: "Not Authorized",
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
        const calendarActivity = await prisma.calendar.findUnique({
          where: { id: id },
        })
        if (!calendarActivity) {
          return {
            success: false,
            error: "ERROR no calendar activity",
          }
        }
        if (calendarActivity.userId !== user.id) {
          return {
            success: false,
            error: "NOT AUTHORIZED",
          }
        }
        return {
          success: true,
          body: calendarActivity,
        }
      }
      // POST
      case "POST": {
        let success = true
        let error = "is required in Body"
        ;("")
        if (!body?.date) {
          success = false
          error = "date, " + error
        }
        if (!body?.startTime) {
          success = false
          error = "startTime, " + error
        }
        if (!body?.endTime) {
          success = false
          error = "endTime, " + error
        }
        if (!body?.name) {
          success = false
          error = "name, " + error
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

        const postBody = {
          data: {
            userId: user.id,
            date: body.date,
            startTime: body.startTime,
            endTime: body.endTime,
            name: body.name,
            description: body.description,
          },
        }
        const calendarActivity = await prisma.calendar.create(postBody)
        if (!calendarActivity) {
          return {
            success: false,
            error: "Error while posting new calendar activity",
          }
        }
        return {
          success: true,
          body: calendarActivity,
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

        const calendarActivity = await prisma.calendar.findUnique({
          where: { id: id },
        })
        if (!calendarActivity) {
          return {
            success: false,
            error: "ERROR no Calendar activity",
          }
        }

        if (!body) {
          return { success: false, error: "Body is required" }
        }

        let date = calendarActivity.date
        let startTime = calendarActivity.startTime
        let endTime = calendarActivity.endTime
        let name = calendarActivity.name
        let description = calendarActivity.description

        if (body.date) {
          date = body.date
        }
        if (body.startTime) {
          startTime = body.startTime
        }
        if (body.endTime) {
          endTime = body.endTime
        }
        if (body.name) {
          name = body.name
        }
        if (body.description) {
          description = body.description
        }

        const patchBody = {
          where: { id: id },
          data: {
            id: calendarActivity.id,
            userId: calendarActivity.userId,
            date: date,
            startTime: startTime,
            endTime: endTime,
            name: name,
            description: description,
          },
        }

        const updatedCalendarActivity = await prisma.calendar.update(patchBody)
        if (!updatedCalendarActivity) {
          return {
            success: false,
            error: "Error while patching calendar activity",
          }
        }
        return {
          success: true,
          body: updatedCalendarActivity,
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
        const calendarActivity = await prisma.calendar.findUnique({
          where: { id: id },
        })
        if (!calendarActivity) {
          return {
            success: false,
            error: "ERROR no Calendar activity",
          }
        }
        if (calendarActivity.userId !== user.id) {
          return {
            success: false,
            error: "NOT AUTHORIZED",
          }
        }
        const deleteCalendarActivity = await prisma.calendar.delete({
          where: { id: id },
        })
        if (!deleteCalendarActivity) {
          return {
            success: false,
            error: "Error while deleting calendar activity",
          }
        }
        return {
          success: true,
          body: deleteCalendarActivity,
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

  console.log(id as string)

  const result = await main(
    id as string,
    email,
    password,
    body as ActivityBody,
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
