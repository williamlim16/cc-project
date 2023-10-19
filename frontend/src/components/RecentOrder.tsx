import { useEffect, useState } from "react";
import { Order } from "../repositories/order";

export default function RecentOrder() {
  const [order, setOrder] = useState<Order[]>([])
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws`);
    ws.onmessage = (event) => {
      setOrder(JSON.parse(event.data))
    };

    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className="flex h-60 min-w-[300px] flex-col gap-5 pt-5">
      {order.map((order) => (
        <div className=" h-14 w-full rounded-md  p-3 shadow-xl outline outline-2 " key={`order_${order.id}`}>
          <p className="text-lg">{order.name}</p>
        </div>
      ))}
    </div>
  )
}