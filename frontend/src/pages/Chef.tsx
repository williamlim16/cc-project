import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getOrders } from "../repositories/order";

type States = "ongoing" | "completed"

export default function Chef() {
  const types: States[] = ["ongoing", "completed"]
  const [type, setType] = useState<States>("ongoing")
  const { data } = useQuery('orders', getOrders)

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-3xl"> Ongoin Orders 👨‍🍳</h1>
      <Link to="/menu" className="btn"> Menus</Link>
      <div className="join">
        {types.map((typePage) => {
          return (
            <>
              <button
                key={`page_${typePage}`}
                className={`btn join-item ${type === typePage ? "btn-active" : ""}`}
                onClick={() => { setType(typePage) }}
              >
                {typePage}
              </button>
            </>
          )
        })}
      </div>
      <div className="px-10 w-full gap-5 flex flex-col">
        {data?.map(order => {
          if (!order.done && type === "ongoing") {
            return (
              <div className="card bg-base-100 w-full shadow-xl " key={order.id}>
                <div className="card-body">
                  <div className="flex">
                    <div >
                      Name: {order.name}
                      <br />
                      Ordered: {order.menu}
                    </div>
                    <button className="btn btn-success ml-auto">Complete</button>
                  </div>
                </div>
              </div>
            )
          } else if (order.done && type === "completed") {
            return (
              <div className="card bg-base-100 w-full shadow-xl " key={order.id}>
                <div className="card-body">
                  <div className="flex">
                    <div >
                      Name: {order.name}
                      <br />
                      Ordered: {order.menu}
                    </div>
                    <button className="btn btn-success ml-auto">Complete</button>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}