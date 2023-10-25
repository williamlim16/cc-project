import axios, { AxiosError } from "axios";
import { server } from "../config";

type Menu = {
  id: string;
  name: string;
  menu: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getMenus() {
  try {
    const { data } = await axios.get<Menu[]>(`${server}/menus`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}

export async function addMenu({ name }: { name: string }) {
  try {
    await axios.post(`${server}/menus`, {
      name,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}

export async function deleteMenu({ menuId }: { menuId: string }) {
  try {
    await axios.delete(`${server}/menus/${menuId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}
