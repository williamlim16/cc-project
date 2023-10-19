import axios, { AxiosError } from "axios";
import { server } from "../config";

type Order = {
  id: string;
  name: string;
  menu: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getOrders() {
  try {
    const { data } = await axios.get<Order[]>(`http://${server}/orders`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}

export async function addOrder({ name, menu }: { name: string; menu: string }) {
  try {
    await axios.post(`http://${server}/orders`, {
      name,
      menuId: menu,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}
