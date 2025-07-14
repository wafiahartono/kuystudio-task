import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { useTasks } from "../hooks/use-tasks"

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
})

export function CreateTaskDialog({ open, onOpenChange }: {
  open?: boolean
  onOpenChange?(open: boolean): void
}) {
  const formId = React.useId()

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  })

  const { createTask } = useTasks()

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      onOpenChange?.(false)
      toast.success("Task created successfully!")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const onSubmit = React.useCallback((values: z.infer<typeof formSchema>) => {
    createMutation.mutate(values)
  }, [createMutation])

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange?.(open)
      form.reset()
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
          <DialogDescription>
            Fill in the details for your new task. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Something something important" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={createMutation.isPending} form={formId} type="submit">
            {createMutation.isPending && <Loader2Icon className="animate-spin" />}
            Save task
          </Button>
        </DialogFooter>
      </DialogContent >
    </Dialog >
  )
}
