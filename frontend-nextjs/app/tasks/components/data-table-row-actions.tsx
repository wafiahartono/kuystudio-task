"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useMutation } from "@tanstack/react-query"
import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import { Task } from "../data/schema"
import { useTasks } from "../hooks/use-tasks"
import { EditTaskDialog } from "./task-edit"

interface DataTableRowActionsProps {
  row: Row<Task>
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps) {
  const [openEditDialog, setOpenEditDialog] = React.useState(false)

  const { deleteTask } = useTasks()

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully.")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted size-8"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setOpenEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => {
            deleteMutation.mutate(row.original)
          }}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskDialog
        task={row.original}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog} />
    </>
  )
}
