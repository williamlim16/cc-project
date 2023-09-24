import { Suspense } from "react"
import MenuList from "./(components)/MenuList"
import Spinner from "../(components)/Spinner"

async function OrderPage() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-5xl"> List of menu</h1>
      <Suspense fallback={Spinner()}>
        <MenuList />
      </Suspense>
    </div>
  )
}
export default OrderPage