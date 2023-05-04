import UserContextProvider from "@/context/user-context-provider"
import "@/styles/globals.css"
import "typeface-quicksand"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </SessionProvider>
  )
}
