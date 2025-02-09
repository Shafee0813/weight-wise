"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { WeightTableProps } from "@/models/interfaces"

export default function EditWeightForm({weight, date, id} : {weight: number, date: Date, id: string}) {
  const { toast } = useToast();
  const [existingDates, setExistingDates] = useState<string[]>([]);
  const [currentPost, setCurrentPost] = useState<WeightTableProps>();

  useEffect(() => {
    async function fetchDates() {
      const res = await fetch(`/api/weights`, { method: "GET" }); //getting dates from the database
      const data: WeightTableProps[] = await res.json();
      const currPost = await fetch(`/api/table-actions?id=${id}`, { method: "GET" }); //getting the current post
      const currPostData = await currPost.json();
      const updatedData = data.filter((item) => item.date !== currPostData.date);
      setExistingDates(updatedData.map((item) => format(item.date, "yyyy-MM-dd")));
      setCurrentPost(currPostData);
    }
    fetchDates();
    console.log( "aaaaaaaaaaaa" + existingDates);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Define schema inside the component using dynamic validation
  const formSchema = z.object({
    date: z.coerce.date()
      .refine((date) => !existingDates.includes(format(date, "yyyy-MM-dd")), {
        message: "An entry for this date already exists!",
      })
      .refine((date) => date <= new Date(), {
        message: "Date cannot be in the future!",
      }),
    weight: z.number().min(0).max(800),
  });
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: date,
      weight: weight ,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const post = {
        date: values.date,
        weight: values.weight,
      }
      await fetch(`api/table-actions?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
        ,body: JSON.stringify(post),
      })
      toast({
        description: "Success! ",
        duration: 6000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000)
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] flex items-center justify-center p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormDescription> Previous date: {currentPost?.date ? format(new Date(currentPost.date), "PPP") : "N/A"}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input placeholder="100" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormDescription> Previous weight: {currentPost?.weight || "N/A"}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
