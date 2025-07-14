"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { toast } from "sonner"
import { statuses } from "../data/data"
import { Task } from "../data/schema"
import { useTasks } from "../hooks/use-tasks"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">
      TASK-{row.getValue("id")}
    </div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      const { updateTask } = useTasks()

      const toggleStatus = React.useCallback(async () => {
        const newStatus = row.original.status === 'done' ? 'pending' : 'done'

        try {
          await updateTask({ ...row.original, status: newStatus }
          )
          toast.success(`Task marked as ${newStatus}.`)
        } catch (error: any) {
          toast.error(error.message)
        }
      }, [row, updateTask])

      return (
        <div className="flex w-[100px] items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8 cursor-pointer"
            onClick={toggleStatus}
          >
            {status.icon && (
              <status.icon className="text-muted-foreground size-4" />
            )}
            <span>{status.label}</span>
          </Button>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
