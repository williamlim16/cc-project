import Link from "next/link"
import { broadcast, completeOrder, deleteOrder, getAllOrders } from "../order"
import CompleteOrder from "./CompleteOrder"
import { revalidatePath } from "next/cache"
import DeleteOrder from "./DeleteOrder"

async function OrderListChef({ type }: { type: string | undefined }) {
  const { orders } = await getAllOrders({ type })

  async function submitComplete(data: FormData) {
    "use server"
    if (data && data.get('id')) {
      try {
        await completeOrder({ id: data.get('id') as string })
        await broadcast()
      } catch (err) {
        console.log(err)
      }
    }
    revalidatePath("/")
  }

  async function submitDelete(data: FormData) {
    "use server"
    if (data && data.get('id')) {
      await deleteOrder({ id: data.get('id') as string })
    }
    revalidatePath("/")
  }
  const types = ["ongoing", "completed"]
  return (
    <>
      <div className="join">
        {types.map((typePage) => {
          return (
            <>
              <Link
                key={`page_${typePage}`}
                className={`btn join-item ${type === typePage ? "btn-active" : ""}`}
                href={`/order/chef?type=${typePage}`}>
                {typePage}
              </Link>
            </>
          )
        })}
      </div>
      <div className="flex flex-col gap-3">
        {orders?.map((order) => (
          <>
            <div className="card bg-base-100 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{order.name}</h2>
                <p>{order.menus[0]?.name}</p>
                <form className="card-actions justify-end" action={type === "ongoing" ? submitComplete : submitDelete}>
                  <input type="hidden" name="id" value={order.id} />
                  {type === "ongoing" ?
                    <CompleteOrder /> :
                    <DeleteOrder />
                  }
                </form>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}
export default OrderListChef