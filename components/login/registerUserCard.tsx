import { useState } from "react"
import Box from "../basic/box"
import apply from "assert"

interface Props {}

const RegisterUserCard = (props: Props) => {
  return (
    <>
      {/*Outer divs */}
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md w-full px-4">
          <div className="flex flex-col space-y-4">
            {/* H1*/}
            <div className="flex justify-center items-center">
              <h1 className="font-medium text-xl">Let´s create a account!</h1>
            </div>

            {/*first name */}
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-600 bg-white rounded-md px-4 py-2 w-[100%] focus:outline-none focus:ring-2 focus: ring-ourcolors-green"
            />

            {/* last name*/}
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-600 bg-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ring-ourcolors-green"
            />

            {/* email*/}
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-600 bg-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ring-ourcolors-green"
            />

            {/* password*/}
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-600 bg-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ring-ourcolors-green"
            />
            {/* checkboxes for terms and service agreement*/}

            <div className="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>

            {/* signup buttons*/}
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
