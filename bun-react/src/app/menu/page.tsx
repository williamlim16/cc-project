import { Suspense } from "react"
import MenuList from "./(components)/MenuList"
import Spinner from "../(components)/Spinner"
import Link from "next/link"

async function OrderPage() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-3xl"> List of menu</h1>
      <div className="self-end px-10">
        <Link href="/menu/add" className="btn ">Add</Link>
      </div>
      <Suspense fallback={Spinner()}>
        <MenuList />
      </Suspense>
    </div>
  )
}
export default OrderPage