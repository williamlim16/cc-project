"use server"

import { Order } from "@prisma/client"
import prisma from "../../lib/prisma"
import { sleep } from "@/lib/util"
import { METHODS } from "http"

export type FormOrder = Omit<Order, "id" | "done">

export async function addOrder ({name}: FormOrder, menuId: string) {
  // await sleep(1000)
  await prisma.order.create({
    data: {
      name,
      menus: {
        connect: {
          id: menuId
        }
      },
    }
  })
}

export async function getOrders ({page = 0}: {page: number }) {
  // await sleep(1000)
  const orders =  await prisma.order.findMany({
    include: {
      menus: true
    },
    where: {
      done: false
    },
    skip: 10*page,
    take: 10
  })
  const countOngoingOrder = await prisma.order.count({
    select:{
      done: true
    },
    where: {
      done: false
    }
  })
  return {orders, countOngoingOrder}
}

export async function getAllOrders ({type}: {type: string | undefined}) {
  // await sleep(1000)
  let orders 
  if ( type && type === "completed"){
  orders =  await prisma.order.findMany({
    include: {
      menus: true
    },
    where: {
      done: true
    },
  })
  }else {
  orders =  await prisma.order.findMany({
    include: {
      menus: true
    },
    where: {
      done: false
    },
  })
  }
  return {orders}
}

export async function completeOrder ({id}: {id: string}) {
  // await sleep(1000)
  await prisma.order.update({
  where: {
    id
  },
  data: {
    done: true
  },
})
}


export async function deleteOrder ({id}: {id: string}) {
  // await sleep(1000)
  await prisma.order.delete({
  where: {
    id
  },
})
}

export async function broadcast(){
  await fetch(`http://localhost:8000/broadcast`, {
    method: "POST"
  })
}