
import { Suspense } from "react"
import { addOrder } from "../order"
import Spinner from "@/app/(components)/Spinner"
import MenuSelection from "../(components)/MenuSelection"
import SubmitOrder from "../(components)/SubmitOrder"
import { redirect } from "next/navigation"
import Link from "next/link"

function OrderPage() {
  async function submitOrder(data: FormData) {
    "use server"
    await addOrder({
      name: data.get('name') as string,
    }, data.get('menu') as string)
    redirect("/order")
  }

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-3xl"> Place your order!</h1>
      <form className="form-control w-full max-w-xs gap-3" action={submitOrder}>
        <div>
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input type="text" name="name" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <Suspense fallback={Spinner()}>
          <MenuSelection />
        </Suspense>
        <div>
          <label className="label">
            <span className="label-text">Any notes?</span>
          </label>
          <textarea className="textarea textarea-bordered h-24 w-full" placeholder="Bio"></textarea>
        </div>
        <SubmitOrder />
        <Link href="/order" className="btn btn-error" >Cancel</Link>
      </form>
    </div>
  )


}
export default OrderPage