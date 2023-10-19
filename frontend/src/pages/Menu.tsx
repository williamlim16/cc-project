import { Link } from "react-router-dom";
import { deleteMenu, getMenus } from "../repositories/menu";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../main";
import toast from "react-hot-toast";

export default function Menu() {

  const { data } = useQuery('menus', getMenus)

  const mutationMenu = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] })
      toast.success("Successfuly deleted order!", { position: "bottom-center" })
    },
  })

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <h1 className="mt-10 text-3xl"> List of menu</h1>
      <div className="self-end px-10 w-full">
        <Link to="/menu/add" className="btn w-full btn-primary">Add</Link>
      </div>
      <div className="text-left w-full px-10">
        {data?.map((menu) => (
          <div key={menu.id} className="pt-5 w-full">
            <div className="card bg-base-100 shadow-xl w-full">
              <div className="card-body">
                <h2 className="card-title">
                  {menu.name}
                </h2>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-warning"
                    value={menu.id}
                    onClick={() => { mutationMenu.mutate({ menuId: menu.id }) }} >Delete</button>
                </div>
              </div>
            </div>
          </div>
        )
        )}
      </div>
    </div>
  )
}