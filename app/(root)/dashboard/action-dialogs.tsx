"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { WeightTableProps } from "@/models/interfaces"
import { PencilIcon, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import EditWeightForm from "@/components/EditWeightForm"


export const EditWeightDialog  =  ({id} : {id: string}) => {
  const [tableRow, setTableRow] = useState<WeightTableProps>();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/table-actions?id=${id}`, {method: 'GET'});
      const data = await res.json();
      setTableRow(data);    
    }
    fetchData();
  }, [id])

  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="flex justify-start px-2 py-0 "> <PencilIcon className=""/> </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit weight entry</DialogTitle>
          <DialogDescription>You can edit the currently selected weight entry.</DialogDescription>
        </DialogHeader>
        <div className="w-[300px] m-auto">
          <EditWeightForm id={id} weight={tableRow?.weight || 0} date={tableRow?.date || new Date}/>
        </div>
      </DialogContent>
      
    </Dialog>
  )
}


export const DeleteWeightDialog =  ({id} : {id: string}) => {

  async function handleDelete() {
    const res = await fetch(`/api/table-actions?id=${id}`, {method: 'DELETE'});
    const data = await res.json();
    console.log(data);
    window.location.reload();
  }

  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="flex justify-start px-2 py-0 "> <Trash className=""/></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete this entry?</DialogTitle>
        <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
        <DialogFooter>
          <Button type ="submit" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}