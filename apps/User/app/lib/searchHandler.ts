"use server";

import { prisma } from "@repo/db";

export default async function searchHandler(phone:string) {
    if(!phone){
        return null
    }
  try {
    const res = await prisma.user.findMany({
      where: {
  phone: {
    startsWith: phone,
  },
},

      select: {
        userid: true,
        username: true,
        phone: true,
        email: true, // include only fields you need
      },
    });

    if (!res) {
      return {
        msg: "No User Found",
      };
    }

    return {
      res,
    };
  } catch (err) {
    console.error("Search error:", err);
    return {
      msg: "Something went wrong",
    };
  }
}
