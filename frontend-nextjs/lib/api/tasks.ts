import { Task } from "@/app/tasks/data/schema"
import { API_BASE_URL } from "./constants"

async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/tasks`)
  if (!res.ok) throw new Error("Failed to fetch tasks")
  return res.json()
}

async function createTask(task: Pick<Task, "title">): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  if (!res.ok) throw new Error("Failed to create task")
  return res.json()
}

async function updateTask(task: Task): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  if (!res.ok) throw new Error("Failed to update task")
  return res.json()
}

async function deleteTask(task: Task): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
    method: "DELETE"
  })
  if (!res.ok) throw new Error("Failed to delete task")
}

export { createTask, deleteTask, fetchTasks, updateTask }

