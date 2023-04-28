import { NextPage } from "next"

interface Props {
  message: string
}

const ErrorComponent: React.FC<Props> = ({ message }) => {
  return (
    <div>
      <p>Error: {message}</p>
    </div>
  )
}

export default ErrorComponent
