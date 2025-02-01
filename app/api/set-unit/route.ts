import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { WeightUnit } from "@prisma/client";
import { redirect } from "next/navigation";

export async function GET(request : Request) {
  const user = await currentUser()
  if(!user) {
    redirect('/sign-in');
  }
  const {searchParams} = new URL(request.url);
  const unit = searchParams.get('unit');
  if(unit !== 'KG' && unit !== 'LBS') {
    return new Response('Invalid unit', {status: 400})
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
        weightUnit: unit as WeightUnit
      }
    })
    return Response.json(userData);
  }

  const userData = await prisma.userSettings.create({
    data: {
      userId: user.id,
      weightUnit: unit as WeightUnit
    }
  })

  return Response.json(userData);
}