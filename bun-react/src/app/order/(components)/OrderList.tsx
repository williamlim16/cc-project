import Link from "next/link"
import { getOrders } from "../order"

async function OrderList({ page = 0 }: { page: number }) {
  if (page !== 0) {
    page = page - 1
  }
  const { orders, countOngoingOrder } = await getOrders({ page })
  const pages = []
  for (let i = 0; i < Math.ceil(countOngoingOrder.done / 10); i++) {
    pages.push(i + 1)
  }
  return (
    <div className="w-full px-5">
      <div className="flex">
        <div className="join">
          {pages.map((pageNumber) => {
            return (
              <>
                <Link key={`page_${pageNumber}`} className={`btn join-item ${pageNumber - 1 === page ? "btn-active" : ""}`} href={`/order?page=${pageNumber}`}>
                  {pageNumber}
                </Link>
              </>
            )
          })}
        </div>
        <Link href="/order/add" className="btn btn-primary ml-auto">Add</Link>
      </div>
      <div className="mt-3 flex w-full flex-col gap-3">
        {orders?.map((order) => (
          <>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{order.name}</h2>
                <p>{order.menus[0]?.name}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
export default OrderList