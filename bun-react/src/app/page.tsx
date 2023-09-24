import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className='flex h-full flex-col items-center justify-center gap-5'>
        <h1 className='text-5xl'>ECM Café</h1>
        <button className=' btn btn-lg'>
          <Link href="/order">
            Order
          </Link>
        </button>
      </div>
      <button className='btn'>Order as Cashier</button>
    </div>
  )
}
