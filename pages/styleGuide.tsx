import AddTaskButton from "@/components/basic/addTaskButton"
import Box from "@/components/basic/box"
import Button from "@/components/basic/button"
import CategoryBox from "@/components/basic/categoryBox"
import DoubleTextInput from "@/components/basic/doubleTextInput"
import InputCategory from "@/components/basic/inputCategroy"
import InputDate from "@/components/basic/inputDate"
import TaskBoxCard from "@/components/basic/taskBoxCard"
import NavBar from "@/components/navBar"
import AddTaskCard from "@/components/toDo/addTaskCard"
import { NextPage } from "next"

interface Props {}

const StyleGuide: NextPage<Props> = ({}) => {
  return (
    <div className="m-10 w-[390px] flex flex-col items-center border-x-2 border-black ">
      <div className="flex flex-col items-center my-4">
        <h4>AddTaskButton</h4>
        <AddTaskButton className="relative bottom-auto right-auto mt-4"></AddTaskButton>
      </div>
      <div className="flex flex-col items-center w-full my-4">
        <h4>AddTaskCard</h4>
        <AddTaskCard></AddTaskCard>
      </div>
      <div className="flex flex-col items-center w-full my-4 bg-ourcolors-green">
        <h4>TaskBoxCard</h4>
        <TaskBoxCard className="my-4">
          Text here, text extends when adding more
        </TaskBoxCard>
      </div>
      <div className="flex flex-col items-center w-full my-4">
        <h4>Box</h4>

        <Box>Box takes the size of parrent element</Box>
      </div>
      <div className="flex flex-col items-center w-full my-4">
        <h4>CategoryBox</h4>
        <CategoryBox href="">Text</CategoryBox>
      </div>
      <div className="flex flex-col items-center w-full my-4">
        <h4>Button</h4>
        <Button className="m-2" color="red">
          Text
        </Button>
        <Button className="m-2" color="green">
          Text
        </Button>
        <Button className="m-2" color="purple">
          Text
        </Button>
        <Button className="m-2" color="white">
          Text
        </Button>
        <Button className="m-2" color="yellow">
          Text
        </Button>
      </div>
      <div className="flex flex-col items-center w-full my-4 p-[5%]">
        <h4>DoubleTextInput</h4>
        <DoubleTextInput
          topPlaceholder="test"
          className="m-4"
          initialValueTop={""}
          initialValueBottom={""}
          onChangeTop={function (value: string): void {
            throw new Error("Function not implemented.")
          }}
          onChangeBottom={function (value: string): void {
            throw new Error("Function not implemented.")
          }}
        ></DoubleTextInput>
      </div>
      <div className="flex flex-col items-center w-full my-4">
        <h4>InputCategory</h4>
        <InputCategory
          className="m-4 w-[90%]"
          initialValue={""}
          categories={[]}
          onChange={function (value: string): void {
            throw new Error("Function not implemented.")
          }}
        ></InputCategory>
      </div>
      <div className="flex flex-col items-center w-full my-4">
        <h4>InputDate</h4>
        <InputDate
          className="w-[90%] m-4"
          initialValue={""}
          onChange={function (value: string): void {
            throw new Error("Function not implemented.")
          }}
        ></InputDate>
      </div>
    </div>
  )
}

export default StyleGuide
