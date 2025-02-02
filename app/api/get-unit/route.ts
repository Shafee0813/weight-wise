import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser()
    if(!user) {
      redirect('/sign-in');
    }
    const existingUser = await prisma.userSettings.findUnique({
      where: {
        userId: user?.id
      }
    })
    if(existingUser) {
      return NextResponse.json(existingUser.weightUnit);
    }
    return Response.json('KG');
  } catch (error) {
    return new NextResponse(`Internal Server Error : ${error}`, {status: 500})
  }
}