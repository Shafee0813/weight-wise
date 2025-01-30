import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  if(!user) {
    redirect('/sign-in');
  }

  return (
    <section className='text-center'>
      <h1 className='text-balance pb-2'>Welcome to <span className='text-red-500 '>WeightWise, </span> <span className='font-bold'> {user.firstName} 👋 </span></h1>
      <p className='text-muted-foreground text-sm ' >To get started, choose your preferred unit of weight.</p>
      {/* <h3 className='text-muted-foreground'>This can be changed anytime</h3> */}
      <Separator className='my-3'/>
      <WeightPicker />
    </section>
  )
}

const WeightPicker = () => {

  return (
    <div className='w-full flex gap-3'>
      <Button variant={"outline"} className='w-1/2 py-4'>Kilograms</Button>
      <Button variant={"outline"} className='w-1/2 py-4'>Pounds</Button>
    </div>
  )
}

export default page