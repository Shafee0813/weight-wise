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
import { PencilIcon, Trash } from "lucide-react"


export const EditWeightDialog  =  ({id} : {id: string}) => {
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="flex justify-start px-2 w-full py-0 "> <PencilIcon className="mr-2"/> Edit </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit weight entry</DialogTitle>
          <DialogDescription>You can edit the currently selected weight entry.</DialogDescription>
        </DialogHeader>
        <h1>Current Details : </h1>
      </DialogContent>

    </Dialog>
  )
}


export const DeleteWeightDialog =  ({id} : {id: string}) => {
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="flex justify-start px-2 w-full py-0 "> <Trash className="mr-2"/> Delete </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete</DialogTitle>
      </DialogContent>
    </Dialog>
  )
}