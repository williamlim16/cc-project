import { useQuery } from "react-query"
import { getOrders } from "../repositories/order"
import { Link } from "react-router-dom"
import RecentOrder from "../components/RecentOrder"

export default function Order() {
  const { data } = useQuery('orders', getOrders)

  return (
    <div className="flex w-full flex-col items-center gap-5">

      <h1 className="text-xl">Recently completed order</h1>
      <RecentOrder />

      <div className="mt-10 flex flex-col items-center gap-3">
        <h1 className="text-3xl">Ongoin Orders 🍔</h1>
      </div>

      <div className="px-10 w-full">

        <Link to="/order/add" className="btn btn-primary w-full" >Order</Link>
      </div>
      <div className="px-10 w-full gap-5 flex flex-col">
        {data?.map(order => {
          if (!order.done)
            return (
              <div className="card bg-base-100 w-full shadow-xl " key={order.id}>
                <div className="card-body">
                  <h2 className="card-title">{order.name}</h2>
                  <h3 className="card-body">Ordered: {order.menu}</h3>
                </div>
              </div>
            )
        })}
      </div>
      {/* <Suspense fallback={Spinner()} key={`search_${searchParams.page}`}>
        <OrderList page={searchParams.page as number} />
      </Suspense> */}
    </div>
  )
}