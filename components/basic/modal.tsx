import React, { ReactNode, useState } from "react"
import Box from "./box"
import DoubleTextInput from "./doubleTextInput"
import InputDate from "./inputDate"
import SmallButton from "./smallButton"

interface ModalType {
  children?: ReactNode
  isOpen: boolean
  toggle: () => void
}
/*     <Box>
              <DoubleTextInput
                initialValueTop={""}
                initialValueBottom={""}
                onChangeTop={function (value: string): void {
                  throw new Error("Function not implemented.")
                }}
                onChangeBottom={function (value: string): void {
                  throw new Error("Function not implemented.")
                }}
              />
            </Box>

            <InputDate
              initialValue={""}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.")
              }}
            />

            <SmallButton className=" absolute ml-[25%] my-10" color={"blue"}>
              {" "}
              Create{" "}
            </SmallButton> */

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          {" "}
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {props.children}
          </div>
        </div>
      )}
    </>
  )
}
