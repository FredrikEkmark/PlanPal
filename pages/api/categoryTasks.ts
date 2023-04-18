// Query like this: /api/categoryTasks?userId=<USERID>&categoryId=<CATEGORYID>  and with an Auth header username: email, password: password

import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

type TaskImport = {
  id: string
  title: string
  description: string
  date: Date
  done: Boolean
  categoryId: string
  createdAt: Date
}

type Data = {
  result: TaskImport[] | string
}

const prisma = new PrismaClient()

async function main(
  categoryId: string,
  userId: string,
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!(user?.password === password && user?.email === email)) {
    return "NOT AUTHORIZED"
  }

  const tasks = await prisma.task.findMany({
    where: { categoryId: categoryId },
  })

  if (tasks) {
    return tasks
  }

  return "ERROR"
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

  const { userId, categoryId } = req.query

  const result = await main(
    categoryId as string,
    userId as string,
    email,
    password
  )
  if (result) {
    res.status(200).json({ result: JSON.parse(JSON.stringify(result)) })
    await prisma.$disconnect()
  } else {
    res.status(500).json({ result: "No tasks found" })
    await prisma.$disconnect()
  }
}
