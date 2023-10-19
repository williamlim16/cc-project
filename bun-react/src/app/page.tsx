import Link from "next/link";
import RecentOrder from "./(components)/RecentOrder";
import { Suspense } from "react";
import Spinner from "./(components)/Spinner";

export default function Home() {
  return (
    <div className="mt-20 w-full">
      <div className='flex flex-col items-center justify-center gap-5'>
        <div>
          <h1 className="text-xl">Recently completed order</h1>
          <Suspense fallback={Spinner()}>
            <RecentOrder />
          </Suspense>
        </div>
        <div className="w-full px-10">
          <Link className="btn btn-primary btn-lg w-full" href="/order">
            Order
          </Link>
        </div>
        <div className="w-full px-10">
          <Link className="btn btn-secondary btn-lg w-full" href="/order/chef?type=ongoing">
            Chef
          </Link>
        </div>
      </div>
    </div>
  )
}
