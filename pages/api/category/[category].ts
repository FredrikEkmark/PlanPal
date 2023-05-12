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

type CategoryBody = {
  title: string
  color: string | null
}

type CategoryImport = {
  id: string
  title: string
  color: string
  userId: string
}

type Data = {
  result: {
    success: boolean
    error: string
    body?: CategoryImport
  }
}

async function main(
  id: string | undefined,
  email: string,
  password: string,
  body: CategoryBody | undefined,
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
        const category = await prisma.category.findUnique({
          where: { id: id },
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
        return {
          success: true,
          body: category,
        }
      }
      // POST
      case "POST": {
        if (!body) {
          return { success: false, error: "Body is required" }
        }
        if (!body.title) {
          return { success: false, error: "Title is required in Body" }
        }

        const postBody = {
          data: {
            title: body.title,
            color: body.color,
            userId: user.id,
          },
        }
        const category = await prisma.category.create(postBody)
        if (!category) {
          return {
            success: false,
            error: "ERROR no Category",
          }
        }
        return {
          success: true,
          body: category,
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
        const category = await prisma.category.findUnique({
          where: { id: id },
        })
        if (!category) {
          return {
            success: false,
            error: "Error no Category found",
          }
        }
        if (category.userId !== user.id) {
          return {
            success: false,
            error: "NOT AUTHERIZED",
          }
        }

        if (!body) {
          return { success: false, error: "Body is required" }
        }
        let title = category.title

        if (body.title) {
          title = body.title
        }

        const postBody = {
          where: { id: id },
          data: {
            title: title,
            userId: category.userId,
          },
        }
        const updatedCategory = await prisma.category.update(postBody)
        if (!updatedCategory) {
          return {
            success: false,
            error: "ERROR while patching Category",
          }
        }
        return {
          success: true,
          body: updatedCategory,
        }
      }
      case "DELETE": {
        if (id == undefined) {
          return {
            success: false,
            error: "Id not provided",
          }
        }
        const category = await prisma.category.findUnique({
          where: { id: id },
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
        const deleteCategory = await prisma.category.delete({
          where: { id: id },
        })
        if (!deleteCategory) {
          return {
            success: false,
            error: "ERROR while deleting category",
          }
        }
        return {
          success: true,
          body: deleteCategory,
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
    body as CategoryBody,
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
