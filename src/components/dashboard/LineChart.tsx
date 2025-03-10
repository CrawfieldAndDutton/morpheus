import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define TypeScript interfaces for data and chart config
interface ChartData {
  month: string;
  calls: number;
}



export function LineChartUi(): JSX.Element {

  const chartData: ChartData[] = [
    { month: "January", calls: 186 },
    { month: "February", calls: 305 },
    { month: "March", calls: 237 },
    { month: "April", calls: 73 },
    { month: "May", calls: 209 },
    { month: "June", calls: 214 },
    { month: "July", calls: 213 },
    { month: "August", calls: 213 },
    { month: "September", calls: 213 },
    { month: "October", calls: 210 },
    { month: "November", calls: 212 },
    { month: "December", calls: 223 },
  ];
  
  const chartConfig: ChartConfig = {
    calls: {
      label: "Api Calls",
      color: "hsl(221.2 83.2% 53.3%)",
    },
  };


  return (
    <Card className="w-[55%] max-w-full p-4 max-sm:w-[100%]">
      <CardHeader>
        <CardTitle>Monthly API Usage</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-70" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="calls"
              type="linear"
              stroke="hsl(54, 90%, 61%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing API usage for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
