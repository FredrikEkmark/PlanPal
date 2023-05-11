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
import { prisma } from "../../../client"

type UserBody = {
  email: string
  password: string
  firstName: string | undefined
}

type UserImport = {
  id: string
  email: string
  password: string
  firstName: string | undefined
  lastName: string | undefined
}

type Data = {
  result: UserImport | string
}

async function main(
  authUser: string,
  authPassword: string,
  body: UserBody | undefined,
  method: string | undefined
) {
  if (
    authUser !== process.env.CREATE_USER &&
    authPassword !== process.env.CREATE_USER_PASSWORD
  ) {
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

  // HÄR SKRIVER VI ERROR LOGIKEN //
  const result = await main(username, password, body as UserBody, req.method)
  if (result) {
    res.status(200).json({ result: JSON.parse(JSON.stringify(result)) })
  } else {
    res.status(500).json({ result: "No categories found" })
  }
}
