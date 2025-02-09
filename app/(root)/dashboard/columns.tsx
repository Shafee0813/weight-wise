"use client"

import { Button } from "@/components/ui/button"
import { WeightTableProps } from "@/models/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { DeleteWeightDialog, EditWeightDialog } from "./action-dialogs"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<WeightTableProps>[] = [
  {
    accessorKey: "weight",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Weight
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="" 
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: (weights) => {

      const weight = weights.row.original

      return (
        <div className="flex justify-end gap-4">
          <EditWeightDialog id={weight.id} />
          <DeleteWeightDialog id={weight.id} />
        </div>
      )
  },
},
]