
import { Suspense } from "react"
import Spinner from "@/app/(components)/Spinner"
import OrderListChef from "../(components)/OrderListChef"
import Link from "next/link"

function OrderPageChef({ searchParams }: {
  searchParams: { [key: string]: string | undefined }
}) {

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-3xl"> Ongoin Orders 👨‍🍳</h1>
      <Link href="/menu" className="btn"> Menus</Link>
      <Suspense fallback={Spinner()} key={`search_${searchParams.type}`}>
        <OrderListChef type={searchParams.type} />
      </Suspense>
    </div>
  )

}
export default OrderPageChef