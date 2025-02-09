import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PUT(request : Request) {
  try {  
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

    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return new NextResponse('Missing id', {status: 400})
    }

    const {weight, date} = await request.json();
    const updatedPost = await prisma.weight.update({
      where: {
        id: Number(id)
      },
      data: {
        weight: weight,
        date: date
      }
    })
    return NextResponse.json(updatedPost);
  } catch (error) {
    return new NextResponse(`Internal Server Error : ${error}`, {status: 500})
  }
}
export async function GET(request : Request) {
  try {  
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

    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return new NextResponse('Missing id', {status: 400})
    }
    const data = await prisma.weight.findFirst({
      where: {
        id: Number(id)
      }
    })
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(`Internal Server Error : ${error}`, {status: 500})
  }
}

export async function DELETE(request : Request) {
  try {  
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

    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return new NextResponse('Missing id', {status: 400})
    }
    const data = await prisma.weight.delete({
      where: {
        id: Number(id)
      }
    })
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(`Internal Server Error : ${error}`, {status: 500})
  }
}

