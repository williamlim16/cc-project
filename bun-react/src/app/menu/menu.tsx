"use server"

import { Menu } from "@prisma/client"
import prisma from "../../lib/prisma"
import { sleep } from "@/lib/util"

export type FormMenu = Omit<Menu, "id" | "orderId">

export async function addMenu(menu: FormMenu) {
  await prisma.menu.create({
    data: {
      name: menu.name
    }
  })
}

export async function getMenus() {
  // await sleep(1000)
  return await prisma.menu.findMany({})
}

export async function deleteMenu(id: string) {
  await prisma.menu.delete({
    where: {
      id
    }
  })
}
