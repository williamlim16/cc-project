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
    const { data } = await axios.get<Menu[]>(`http://${server}/menus`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}
