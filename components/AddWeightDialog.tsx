import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import InputForm from "./InputForm"
import { Calendar } from "./ui/calendar"

export function AddWeightDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add weight</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Update your weight log</DialogTitle>
          <DialogDescription>
            Add your weight to keep track of your progress
          </DialogDescription>
        </DialogHeader>
        <InputForm />
      </DialogContent>
    </Dialog>
  )
}
