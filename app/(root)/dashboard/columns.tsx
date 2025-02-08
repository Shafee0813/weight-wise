"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { WeightTableProps } from "@/models/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { Ellipsis } from "lucide-react"
import { DeleteWeightDialog, EditWeightDialog } from "./action-dialogs"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<WeightTableProps>[] = [
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: (weights) => {

      const weight = weights.row.original


      return (
        <div className="flex justify-end">

        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0"><Ellipsis/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="" asChild>
              <EditWeightDialog id={weight.id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteWeightDialog id={weight.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>

        </DropdownMenu>
        </div>
      )
  },
},
]