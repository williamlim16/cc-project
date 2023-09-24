"use client"

import { experimental_useFormStatus as useFormStatus } from 'react-dom'
function SubmitOrder() {

  const { pending } = useFormStatus()
  return (
    <>
      {pending ?
        <button className="btn btn-primary" type="submit" >
          <span className="loading loading-spinner loading-md"></span>
        </button>
        :
        <button className="btn btn-primary" type="submit" >Order</button>
      }
    </>
  )
}
export default SubmitOrder