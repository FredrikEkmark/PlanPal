// Query like this: /api/login and with an Auth header username: email, password: password

import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, User } from "@prisma/client"

type Data = {
  result: User | string
}

const prisma = new PrismaClient()

async function main(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  })
  if (user?.password === password) {
    return user
  }
  return "Wrong Password"
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

  const resualt = await main(email, password)
  if (resualt) {
    res.status(200).json({ result: resualt })
    await prisma.$disconnect()
  } else {
    res.status(500).json({ result: "No user found" })
    await prisma.$disconnect()
  }
}
