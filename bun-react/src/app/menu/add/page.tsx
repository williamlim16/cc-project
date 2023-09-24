import { redirect } from "next/navigation"
import { addMenu } from "../menu"

function OrderPage() {

  async function submitMenu(data: FormData) {
    "use server"
    if (data && data.get('name')) {
      await addMenu({
        name: data.get('name') as string
      })
      redirect("/menu")
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-5xl"> Add new menu</h1>
      <form className="form-control w-full max-w-xs gap-3" action={submitMenu} >
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="name" />
        </div>
        <button className="btn btn-primary" type="submit" >Order</button>
      </form>
    </div>
  )
}
export default OrderPage