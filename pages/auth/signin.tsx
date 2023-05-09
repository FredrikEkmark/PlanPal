import { NextPage } from "next"

interface Props {}

const Signin: NextPage<Props> = ({}) => {
  return <div></div>
}

export default Signin

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  }
}
