
import { getMenus } from "@/app/menu/menu"

async function MenuSelection() {

  const menus = await getMenus()
  return <div>
    <label className="label">
      <span className="label-text">Order</span>
    </label>

    <select className="select select-bordered w-full max-w-xs" name="menu">
      {menus.map((menu) => (
        <option key={menu.id} value={menu.id}>
          {menu.name}
        </option>
      ))}
    </select>
  </div>
}
export default MenuSelection