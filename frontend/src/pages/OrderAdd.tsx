import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { getMenus } from "../repositories/menu";
import { useEffect, useState } from "react";
import { addOrder } from "../repositories/order";
import { queryClient } from "../main";
import toast from "react-hot-toast";

export default function OrderAdd() {
  const navigate = useNavigate();
  const { data, isSuccess } = useQuery('menus', getMenus)
  const [dataForm, setDataForm] = useState({
    name: "",
    menu: "",
  })
  useEffect(() => {
    if (data) {
      setDataForm(() => ({ ...dataForm, menu: data[0].id }))
    }
  }, [data, isSuccess])

  const mutation = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order'] })
      navigate("/order")
      toast.success("Successfuly added order!")
      console.log("bro")
    },
  })

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-3xl"> Place your order!</h1>
      <div className="form-control w-full max-w-xs gap-3" >
        <div>
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input type="text" name="name"
            value={dataForm.name}
            onChange={(event) => {
              setDataForm({ ...dataForm, name: event.target.value })
            }}
            placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Choose your menu!</span>
          </label>
          <select className="select select-bordered w-full max-w-xs" name="menu"
            onChange={(event) => { setDataForm({ ...dataForm, menu: event.target.value }) }}
            value={dataForm.menu}>
            {data?.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success" onClick={() => {
          mutation.mutate({
            name: dataForm.name,
            menu: dataForm.menu
          })
        }}>ORDER</button>
        <Link to="/order" className="btn btn-error" >Cancel</Link>
      </div>
    </div>
  )
}