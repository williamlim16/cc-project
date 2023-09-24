"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

function CompleteOrder() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ?
        <span className="loading loading-spinner loading-md"></span>
        :
        <button className="btn btn-success">Complete</button>
      }
    </>
  )
}
export default CompleteOrder