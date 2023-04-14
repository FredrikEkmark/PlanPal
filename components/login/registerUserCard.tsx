import { useState } from "react"

interface Props {}

const RegisterUserCard = (props: Props) => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md w-full px-4">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-600 bg-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus: ring-ourcolors-green"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-600 bg-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ring-ourcolors-green"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-600 bg-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ring-ourcolors-green"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-600 bg-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ring-ourcolors-green"
            />

            <button className="bg-ourcolors-green text-white font-bold rounded-md px-4 py-2 w-full border border-gray-600">
              Sign up!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterUserCard
