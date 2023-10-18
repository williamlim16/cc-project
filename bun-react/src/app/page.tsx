import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-20 w-full">
      <div className='flex flex-col items-center justify-center gap-5'>
        <Link className="btn btn-lg" href="/order">
          Order
        </Link>
        <Link className="btn btn-lg" href="/order/chef?type=ongoing">
          Chef
        </Link>
      </div>
    </div>
  )
}
