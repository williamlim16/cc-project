import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addMenu } from "../repositories/menu";
import { useMutation } from "react-query";
import { queryClient } from "../main";
import toast from "react-hot-toast";

export default function MenuAdd() {
  const [dataForm, setDataForm] = useState({
    name: "",
  })

  const navigate = useNavigate();
  const mutationMenu = useMutation({
    mutationFn: addMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] })
      toast.success("Successfuly deleted order!", { position: "bottom-center" })
      navigate("/menu")
    },
  })
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-3xl"> List of menu</h1>
      <div className="w-full px-10">
        <label className="label">
          <span className="label-text">Menu name</span>
        </label>
        <input type="text" name="name"
          value={dataForm.name}
          onChange={(event) => {
            setDataForm({ ...dataForm, name: event.target.value })
          }}
          placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <div className="pt-10 flex flex-col w-full gap-5">
          <button className="btn btn-success w-full" onClick={() => { mutationMenu.mutate({ name: dataForm.name }) }}>Submit</button>
          <Link to="/menu" className="btn btn-error w-full">Cancel</Link>
        </div>
      </div>
    </div>
  )
}