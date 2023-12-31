import axios, { AxiosError } from "axios";
import { protocol, server } from "../config";

export type Order = {
  id: string;
  name: string;
  menu: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getOrders() {
  try {
    const { data } = await axios.get<Order[]>(`${protocol}://${server}/orders`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}

export async function addOrder({ name, menu }: { name: string; menu: string }) {
  try {
    await axios.post(`${protocol}://${server}/orders`, {
      name,
      menuId: menu,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}

export async function completeOrder({ orderId }: { orderId: string }) {
  try {
    await axios.patch(`${protocol}://${server}/orders/${orderId}`);
    await axios.post(`${protocol}://${server}/broadcast`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}

export async function deleteOrder({ orderId }: { orderId: string }) {
  try {
    await axios.delete(`${protocol}://${server}/orders/${orderId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}
