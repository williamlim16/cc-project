import { revalidatePath } from "next/cache"
import { deleteMenu, getMenus } from "../menu"
import DeleteMenu from "./DeleteMenu"

async function MenuList() {
  const menus = await getMenus()

  async function submitDelete(data: FormData) {
    "use server"
    if (data && data.get('id')) {
      await deleteMenu(data.get('id') as string)
    }
    revalidatePath("/")
  }

  return (
    <div className="text-left">
      {menus.map((menu) => (
        <form key={menu.id} className="mt-5" action={submitDelete}>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {menu.name}
              </h2>
              <div className="card-actions justify-end">
                <input type="hidden" name="id" value={menu.id} />
                <DeleteMenu />
              </div>
            </div>
          </div>
        </form>
      )
      )}
    </div>
  )
}
export default MenuList