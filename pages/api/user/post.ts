/*
Query like this: 
URL: /api/user/post 
AUTH Basic: username: .env CREATE_USER, Password: .env CREATE_USER_PASSWORD 
BODY: {
  "email": string,
  "password": sting,
  "firstName": sting | undefined,
  "lastName": sting | undefined
}
METHODE: POST
*/

import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

type UserBody = {
  email: string
  password: string
  firstName: string | undefined
  lastName: string | undefined
}

type UserImport = {
  id: string
  title: string
  color: string
  userId: string
}

type Data = {
  result: UserImport | string
}

const prisma = new PrismaClient()

async function main(
  authUser: string,
  authPassword: string,
  body: UserBody | undefined,
  method: string | undefined
) {
  if (authUser !== "1" && authPassword !== "1") {
    return "NOT AUTHORIZED"
  }

  if (method === "POST") {
    if (!body?.email) {
      return `Email is required in Body`
    }
    if (!body?.password) {
      return `Password is required in Body`
    }

    const postBody = {
      data: {
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
      },
    }
    const user = await prisma.user.create(postBody)
    if (!user) {
      return "ERROR"
    }
    return user
  } else {
    return `Method ${method} Not Allowed`
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

  const [username, password] = Buffer.from(authValue, "base64")
    .toString()
    .split(":")

  const body = req.body

  const result = await main(username, password, body as UserBody, req.method)
  if (result) {
    res.status(200).json({ result: JSON.parse(JSON.stringify(result)) })
    await prisma.$disconnect()
  } else {
    res.status(500).json({ result: "No categories found" })
    await prisma.$disconnect()
  }
}
