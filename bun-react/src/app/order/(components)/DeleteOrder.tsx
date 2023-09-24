"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

function DeleteOrder() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ?
        <span className="loading loading-spinner loading-md"></span>
        :
        <button className="btn btn-error">Delete</button>
      }
    </>
  )
}
export default DeleteOrder