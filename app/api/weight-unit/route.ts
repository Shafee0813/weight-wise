import { prisma } from "@/lib/prisma";
import { WeightUnitType } from "@/models/interfaces";
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
    return Response.json('Kg');
  } catch (error) {
    return new NextResponse(`Internal Server Error : ${error}`, {status: 500})
  }
}



export async function PUT(request : Request) {
  const user = await currentUser()
  if(!user) {
    redirect('/sign-in');
  }
  const {searchParams} = new URL(request.url);
  const unit = searchParams.get('unit');
  if(unit !== 'Kg' && unit !== 'Lb') {
    return new NextResponse('Invalid unit', {status: 400})
  }

  const existingUser = await prisma.userSettings.findUnique({
    where: {
      userId: user.id
    }
  })
  if(existingUser) {
    const userData = await prisma.userSettings.update({
      where: {
        userId: user.id
      },
      data: {
        weightUnit: unit as WeightUnitType
      }
    })
    return NextResponse.json(userData);
  }

  const userData = await prisma.userSettings.create({
    data: {
      userId: user.id,
      weightUnit: unit as WeightUnitType
    }
  })

  return NextResponse.json(userData);
}