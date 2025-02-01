import { Separator } from '@/components/ui/separator'
import WeightPicker from '@/components/WeightPicker'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  if(!user) {
    redirect('/sign-in');
  }
  const prevUnit = await fetch(`/api/get-unit`, {method: 'PUT'});
  const data = await prevUnit.json();

  return (
    <section className='text-center'>
      <h1 className='text-balance pb-2'>Welcome to <span className='text-red-500 '>WeightWise, </span> <span className='font-bold'> {user.firstName} 👋 </span></h1>
      <p className='text-muted-foreground text-sm ' >To get started, choose your preferred unit of weight.</p>
      {/* <h3 className='text-muted-foreground'>This can be changed anytime</h3> */}
      <Separator className='my-3'/>
      <WeightPicker prevUnit={data}/>
    </section>
  )
}


export default page