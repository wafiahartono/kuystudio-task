import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.enum(['pending', 'done']),
})

export type Task = {
  id: number;
  title: string;
  status: "pending" | "done";
}
