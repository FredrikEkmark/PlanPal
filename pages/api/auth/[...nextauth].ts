import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/client"
import { User } from "@/types/user"

interface UserAuthentication {
  id: string
  name: string
  email: string
  image: string
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  await prisma
  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "text",
            placeholder: "jsmith@email",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        async authorize(credentials): Promise<UserAuthentication | null> {
          // Add logic here to look up the user from the credentials supplied
          console.log("authorize function is running")
          // Check if the user exists in the database
          const existingUser: User | null = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          })
          if (!existingUser) {
            console.log("NO USER")
            return null
          } else if (
            existingUser &&
            credentials?.password !== existingUser.password
          ) {
            console.log("NO USER")
            return null
          }

          // If all checks pass, return the authenticated user object
          console.log(existingUser)
          return {
            id: existingUser.id,
            name: existingUser.password,
            email: existingUser.email,
            image: existingUser.id,
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
      signOut: "/auth/signout",
      error: "/auth/error", // Error code passed in query string as ?error=
      verifyRequest: "/auth/verify-request", // (used for check email message)
      newUser: "/signup",
    },
  })
}
