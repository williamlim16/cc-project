"use server"

import prisma from "../lib/prisma"

export async function addOrder () {
  await prisma.order.create({
    data: {
      name: "brooo123"
    }
  })
  console.log("done")
}
