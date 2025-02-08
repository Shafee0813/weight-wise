import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser()
  if(!user) {
    redirect('/sign-in');
  }

  const existingUser = await prisma.userSettings.findUnique({
    where: {
      userId: user.id
    }
  })
  if(!existingUser) { 
    redirect('/wizard');
  }

  const userData = await prisma.weight.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      date: 'desc'
    }
  })
  return NextResponse.json(userData);
}

export async function POST(request : Request) {
  const user = await currentUser()
  if(!user) {
    redirect('/sign-in');
  }

  const existingUser = await prisma.userSettings.findUnique({
    where: {
      userId: user.id
    }
  })
  if(!existingUser) { 
    redirect('/wizard');
  }

  const {weight, date} = await request.json();

  const userData = await prisma.weight.create({
    data: {
      userId: user.id,
      weight: weight,
      date: date
    }
  })

  return NextResponse.json(userData);
}