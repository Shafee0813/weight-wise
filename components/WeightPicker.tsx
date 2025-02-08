"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import SkeletonWrapper from "./SkeletonWrapper"
import { redirect } from "next/navigation"

const WeightPicker = ({prevUnit} : {prevUnit : string}) => {
  const [unit, setUnit] = useState(prevUnit)
  const [selected, setSelected] = useState(prevUnit)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    setSelected(prevUnit)
    setTimeout(() => {setLoading(false)}, 1000)
  } , [prevUnit])

  return (
    <div className='flex flex-col gap-3'>
    <div className='w-full flex gap-3 mb-2'>
      <SkeletonWrapper loading={loading}>
      <Button variant={selected === "Kg" ? "default" : "outline"} 
       className='w-1/2 py-4'
       onClick={() => {
        setUnit("Kg")
        setSelected("Kg")
        }}>
        Kilograms
      </Button>
      <Button variant={selected === "Lb" ? "default" : "outline"}
      onClick={() => {
        setUnit("Lb")
        setSelected("Lb")
      }}
      className='w-1/2 py-4'>
        Pounds
      </Button>
    </SkeletonWrapper>
    </div>
    <Button onClick={()=> {
      fetch(`/api/weight-unit?unit=${unit}`, {method: 'PUT'})
      .then(() => {
        redirect('/dashboard')
      })
    }}>
      Done! Take me to the dashboard!
    </Button>
    </div>
  )
}

export default WeightPicker