/* 
Query like this: 
URL: /api/login
AUTH Basic: username: email, password: password 
*/

import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../client"

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

async function main(email: string, password: string) {
  const user = await prisma.user.findUnique({
    // VAD GÖR VI MED DENNA!!!?? //
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

  const result = await main(email, password)
  if (result) {
    res.status(200).json({ result: JSON.parse(JSON.stringify(result)) })
  } else {
    res.status(500).json({ result: "No user found" })
  }
}
