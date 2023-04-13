import { NextPage } from "next"
import { useRouter } from "next/router"

interface Props {}

const Category: NextPage<Props> = ({}) => {
  const router = useRouter()
  const routerParamater = router.query.category

  return <div></div>
}

export default Category
