import { useState } from "react"
import Box from "../basic/box"
import apply from "assert"

const RegisterUserCard = ({}) => {
  return (
    <>
      {/*Outer divs */}
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md px-4">
          <div className="flex flex-col space-y-4">
            {/* H1*/}
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-medium">Let´s create a account!</h1>
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
              className="w-full px-4 py-2 bg-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 ring-ourcolors-green"
            />

            {/* email*/}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 ring-ourcolors-green"
            />

            {/* password*/}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 ring-ourcolors-green"
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
            <button className="w-full px-4 py-2 font-bold text-white border border-gray-600 rounded-md bg-ourcolors-green">
              Sign up!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterUserCard
