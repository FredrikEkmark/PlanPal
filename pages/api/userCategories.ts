/* 
Query like this: 
URL: api/userCategories?userId=<USERID>  
AUTH Basic: username: email, password: password 
*/

import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

type CategoryImport = {
  id: string
  title: string
  color: string
  userId: string
}

type Data = {
  result: CategoryImport[] | string
}

const prisma = new PrismaClient()

async function main(id: string, email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  })

  if (!(user?.password === password && user?.email === email)) {
    return "NOT AUTHORIZED"
  }

  const categories = await prisma.category.findMany({
    where: { userId: id },
  })

  if (categories) {
    return categories
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

  const { userId } = req.query

  const result = await main(userId as string, email, password)
  if (result) {
    res.status(200).json({ result: JSON.parse(JSON.stringify(result)) })
    await prisma.$disconnect()
  } else {
    res.status(500).json({ result: "No categories found" })
    await prisma.$disconnect()
  }
}
