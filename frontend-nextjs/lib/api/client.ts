import { createTask, deleteTask, fetchTasks, updateTask } from "./tasks";

export default {
  tasks: {
    list: fetchTasks,
    create: createTask,
    update: updateTask,
    delete: deleteTask
  }
}
