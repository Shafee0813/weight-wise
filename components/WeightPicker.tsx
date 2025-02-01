"use client"
import { useState } from "react"
import { Button } from "./ui/button"

const WeightPicker = ({prevUnit} : {prevUnit : string}) => {
  const [unit, setUnit] = useState(prevUnit)
  const [selected, setSelected] = useState(prevUnit)

  return (
    <div className='flex flex-col gap-3'>
    <div className='w-full flex gap-3'>
      <Button variant={selected == "KG" ? "default" : "outline"} 
       className='w-1/2 py-4'
       onClick={() => {
        setUnit("KG")
        setSelected("KG")
        }}>
        Kilograms
      </Button>
      <Button variant={selected == "LBS" ? "default " : "outline"}
      onClick={() => {
        setUnit("LBS")
        setSelected("LBS")
      }}
      className='w-1/2 py-4'>
        Pounds
      </Button>
    </div>
    <Button onClick={()=> {
      fetch(`/api/set-unit?unit=${unit}`)
      .then(() => {
        window.location.href = '/dashboard'
      })
    }}>
      Done! Take me to the dashboard!
    </Button>
    </div>
  )
}

export default WeightPicker