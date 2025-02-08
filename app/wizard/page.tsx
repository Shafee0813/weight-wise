"use client"
import { DesktopLogo } from '@/components/Logo'
import { Separator } from '@/components/ui/separator'
import WeightPicker from '@/components/WeightPicker'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [data, setData] = useState("")

  async function authAndFetch() {

    const prevUnit = await fetch(`/api/weight-unit`, {method: 'GET'});
    const parsedData = await prevUnit.json();
    setData(parsedData);
    console.log(parsedData);
  }
  
  useEffect(() => {
    authAndFetch();
  }, []);

  return (
    <section className='text-center'>
      <h1 className='text-balance pb-2'>Welcome to <span className='text-red-500 '>WeightWise, </span>👋 </h1>
      <p className='text-muted-foreground text-sm ' >To get started, choose your preferred unit of weight.</p>
      {/* <h3 className='text-muted-foreground'>This can be changed anytime</h3> */}
      <Separator className='my-5'/>
      <WeightPicker prevUnit={data}/>
      <div className='w-full flex justify-center items-center mt-4'>
        <DesktopLogo/>
      </div>
    </section>
  )
}


export default Page