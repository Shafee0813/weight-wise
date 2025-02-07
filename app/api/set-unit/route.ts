import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type WeightUnitType = 'KG' | 'LBS';

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
        weightUnit: unit as WeightUnitType
      }
    })
    return Response.json(userData);
  }

  const userData = await prisma.userSettings.create({
    data: {
      userId: user.id,
      weightUnit: unit as WeightUnitType
    }
  })

  return Response.json(userData);
}