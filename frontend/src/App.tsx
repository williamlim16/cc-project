import { Link } from "react-router-dom"
import RecentOrder from "./components/RecentOrder"

function App() {

  return (
    <>
      <div className="mt-20 w-full">
        <div className='flex flex-col items-center justify-center gap-5'>
          <div>
            <h1 className="text-xl">Recently completed order</h1>
            <RecentOrder />
          </div>
          <div className="w-full px-10">
            <Link to="/order" >
              <button className="btn btn-primary btn-lg w-full">
                Order
              </button>
            </Link>
          </div>
          <div className="w-full px-10">
            <Link to="/chef" >
              <button className="btn btn-secondary btn-lg w-full" >
                Chef
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
