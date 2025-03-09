import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
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

const chartData = [
  { browser: "PAN", visitors: 275, fill: "hsl(44, 90%, 53.3%)" },
  { browser: "Aadhar", visitors: 200, fill: "hsl(44, 90%, 68%)" },
  { browser: "Voter", visitors: 187, fill: "hsl(44, 90%, 60%)" },
  { browser: "Vehicle RC", visitors: 173, fill: "hsl(44, 90%, 78%)" },
  { browser: "Passport", visitors: 90, fill: "hsl(44, 90%, 87%)" },
];

const chartConfig: ChartConfig = {
  visitors: {
    label: "pan",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(221.2, 83.2%, 53.3%)",
  },
  safari: {
    label: "Safari",
    color: "hsl(212, 95%, 68%)",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(216, 92%, 60%)",
  },
  edge: {
    label: "Edge",
    color: "hsl(210, 98%, 78%)",
  },
  other: {
    label: "Other",
    color: "hsl(212, 97%, 87%)",
  },
};

export function PieChartUi() {
  return (
    <Card className="flex flex-col w-[40%] max-sm:w-[100%] p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>API Usage</CardTitle>
        <CardDescription>All API usage uptil now</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0  flex justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0 flex justify-center w-[250px] h-[250px] items-center "
        >
          <PieChart >
            <ChartTooltip
              content={<ChartTooltipContent  hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="black"
                  >
                    {payload.visitors}
                  </text>
                );
              }}
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
        <div className="leading-none text-muted-foreground">
          Showing total API usage
        </div>
      </CardFooter>
    </Card>
  );
}
