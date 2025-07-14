"use client"

import { columns } from "./tasks/components/columns"
import { DataTable } from "./tasks/components/data-table"
import { TasksProvider, useTasks } from "./tasks/hooks/use-tasks"

export default function TaskPage() {
  return (
    <TasksProvider>
      <div className="flex h-full flex-1 flex-col gap-8 p-8 md:flex">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month.
            </p>
          </div>
        </div>
        <Content />
      </div>
    </TasksProvider>
  )
}

function Content() {
  const { tasksQuery } = useTasks()

  return <>
    {!tasksQuery.data && (
      <div className="flex justify-center items-center py-10">
        <span className="animate-pulse text-muted-foreground">Loading tasks...</span>
      </div>
    )}
    {tasksQuery.data && <DataTable data={tasksQuery.data} columns={columns} />}
  </>
}
