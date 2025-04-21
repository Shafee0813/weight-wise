"use client"

import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import { Area, AreaChart, CartesianGrid, Label, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import SkeletonWrapper from "./SkeletonWrapper"

interface WeightData {
  date: string
  weight: number
}

export function WeightChart() {
  const [data, setData] = useState<WeightData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/weights`, {method: 'GET'});

        if (!response.ok) {
          throw new Error("Failed to fetch weight data")
        }

        const weightData = await response.json()

        // Format the data for the chart
        const formattedData = weightData.map((item: WeightData) => ({
          ...item,
          formattedDate: format(parseISO(item.date), "MMM dd"),
        }))
        console.log(formattedData)
        setData(formattedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  if (data.length === 0 && !loading) {
    return (
      <div className="flex items-center justify-center h-full my-5 bg-[#F5F5F5] dark:bg-[#101010] mx-auto w-fit">
        <p className="text-muted-foreground p-60 max-md:p-40 max-sm:p-10">No weight data available</p>
      </div>
    )
  }

  return (
    <div className="w-full p-4">
      <SkeletonWrapper loading={loading} className=" max-w-[800px] m-auto" >
        <ChartContainer
          config={{
            weight: {
              label: "Weight",
              color: "hsl(var(--chart-6))",
            },
          }}
          className="h-full w-full max-w-[800px] m-auto border-[1px] rounded-md p-4 py-6 bg-[#F5F5F5] text-black dark:bg-[#101010] dark:text-white"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-weight)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-weight)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="formattedDate" tickLine={false} axisLine={false} tickMargin={8} >
              </XAxis> 
              
              <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={["auto", "auto"]}>
                <Label value="Weight" angle={-90} position="insideLeft" />
              </YAxis>
              <ChartTooltip
                content={
                  <ChartTooltipContent formatter={(value) => `${value} kg`} labelFormatter={(label) => `Date: ${label}`} />
                }
                />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="var(--color-weight)"
                fillOpacity={1}
                fill="url(#weightGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </SkeletonWrapper>
    </div>
  )
}
