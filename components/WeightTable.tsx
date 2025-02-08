"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns";
import { WeightTableProps } from "@/models/interfaces";
import { DataTable } from "@/app/(root)/dashboard/data-table";
import { columns } from "@/app/(root)/dashboard/columns";


const WeightTable = () => {
  const [data, setData] = useState<WeightTableProps[]>();
  const [unit, setUnit] = useState("");
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/weights`, {method: 'GET'});
      const jsonData = await res.json();
      jsonData.map((item: WeightTableProps) => item.date = format(item.date, "yyyy-MM-dd"));
      setData(jsonData);
      const prevUnit = await fetch(`/api/weight-unit`, {method: 'GET'});
      const parsedData = await prevUnit.json();
      if(parsedData === "Kg") setUnit("Kilograms"); 
      else setUnit("Pounds");
    }
    fetchData();
  },[])
  return (
    <div className="w-full p-4">
      <h1 className="heading-text font-bold p-4 pb-8 max-md:p-2 max-md:pb-4"> Your entries</h1>
      <DataTable columns={columns} data={ data || [] } unit = {unit}  />
    </div>
  )
}

export default WeightTable