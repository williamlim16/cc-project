import { Suspense } from "react"
import Spinner from "../(components)/Spinner"
import OrderList from "./(components)/OrderList"
import Link from "next/link"

function OrderPage({ searchParams }: {
  searchParams: { [key: string]: number | string | string[] | undefined }
}) {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="mt-10 flex flex-col items-center gap-3">
        <h1 className="text-3xl"> Ongoin Orders 🍔</h1>
      </div>
      <Suspense fallback={Spinner()} key={`search_${searchParams.page}`}>
        <OrderList page={searchParams.page as number} />
      </Suspense>
    </div>
  )

}
export default OrderPage