"use client"

import client from "@/lib/api/client"
import { QueryClient, QueryClientProvider, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import * as React from "react"
import { Task } from "../data/schema"

interface TasksProviderProps {
  children: React.ReactNode
}

interface TasksProviderState {
  tasksQuery: UseQueryResult<Task[]>
  createTask: (task: Pick<Task, "title">) => Promise<Task>
  updateTask: (task: Task) => Promise<Task>
  deleteTask: (task: Task) => Promise<void>
}

const TasksContext = React.createContext<TasksProviderState | undefined>(undefined)

const useTasks = () => {
  const context = React.useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
}

const QUERY_KEY = ["tasks"]

const Tasks = ({ children }: TasksProviderProps) => {
  const queryClient = useQueryClient()

  const tasksQuery = useQuery<Task[]>({
    queryKey: QUERY_KEY,
    queryFn: client.tasks.list,
  })

  const createTask = React.useCallback(async (task: Pick<Task, "title">) => {
    const createdTask = await client.tasks.create(task)

    queryClient.invalidateQueries({ queryKey: QUERY_KEY })

    return createdTask
  }, [queryClient])

  const updateTask = React.useCallback(async (task: Task) => {
    await queryClient.cancelQueries({ queryKey: QUERY_KEY })

    const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEY)

    queryClient.setQueryData<Task[]>(QUERY_KEY, old =>
      old?.map(t =>
        t.id === task.id ? { ...t, ...task } : t
      )
    )

    try {
      const updatedTask = await client.tasks.update(task)

      queryClient.invalidateQueries({ queryKey: QUERY_KEY })

      return updatedTask
    } catch (error) {
      queryClient.setQueryData<Task[]>(QUERY_KEY, previousTasks)
      throw error
    }
  }, [queryClient])

  const deleteTask = React.useCallback(async (task: Task) => {
    await queryClient.cancelQueries({ queryKey: QUERY_KEY })

    const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEY)

    queryClient.setQueryData<Task[]>(QUERY_KEY, old =>
      old?.filter(t => t.id !== task.id)
    )

    try {
      await client.tasks.delete(task)

      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    } catch (error) {
      queryClient.setQueryData<Task[]>(QUERY_KEY, previousTasks)
      throw error
    }
  }, [queryClient])

  const providerValue = React.useMemo(
    () => ({
      tasksQuery,
      createTask,
      updateTask,
      deleteTask,
    }),
    [tasksQuery, createTask, updateTask, deleteTask]
  )

  return (
    <TasksContext.Provider value={providerValue}>
      {children}
    </TasksContext.Provider>
  )
}

const TasksProvider = (props: TasksProviderProps) => {
  const [queryClient] = React.useState(() => new QueryClient())
  const context = React.useContext(TasksContext)

  if (context) return <>{props.children}</>
  return (
    <QueryClientProvider client={queryClient}>
      <Tasks {...props} />
    </QueryClientProvider>
  )
}

export { TasksProvider, useTasks }

