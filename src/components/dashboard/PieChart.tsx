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
import { useEffect, useState } from "react";
import { dashboardApi } from "@/apis/modules/dashboard";



export function PieChartUi() {

  const [dashboardData, setDashboardData] = useState<any>([]);

  //used to get the data whenever the user comes to dashboard
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await dashboardApi.getApiUsage();
        setDashboardData(response);
      } catch (err) {
        console.log("error in fetching dashboard")
      } 
    };
    fetchData();
    
  }, []);
  
  //sorting the data to map it with the colors array
  const sortedChartData = [...dashboardData].sort((a, b) => b.calls - a.calls);
  
  //colors deep to light
  const fillColors = [
    "hsl(44, 90%, 50.3%)",
    "hsl(44, 90%, 60%)" ,
    "hsl(44, 90%, 68%)" ,
    "hsl(44, 90%, 78%)" ,
    "hsl(44, 90%, 87%)",
  ]

  //mapping the colors with the coming values
  const schartData = sortedChartData.map((item, index :number) => ({
    ...item,
    fill: fillColors[index], // Default to last color if out of range
  }));
  
  
  //not using anything
  const chartConfig: ChartConfig = {
    visitors: {
      label: "pan",
    },
    PAN: {
      label: "pan",
      color: "",
    },
    Aadhar: {
      label: "aadhar",
      color: "hsl(212, 95%, 68%)",
    },
    Voter: {
      label: "voter",
      color: "hsl(216, 92%, 60%)",
    },
    VehicleRC: {
      label: "Vehicle RC",
      color: "hsl(210, 98%, 78%)",
    },
    Passport: {
      label: "Passport",
      color: "hsl(212, 97%, 87%)",
    },
  };



  return (
    <Card className="flex flex-col w-[45%] max-sm:w-[100%] p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>API Usage</CardTitle>
        <CardDescription>All API usage uptil now</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0  flex justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0 m-2 flex justify-center w-[330px] h-[250px] items-center "
        >
          <PieChart className="p-0">
            <ChartTooltip
              content={<ChartTooltipContent  hideLabel />}
            />
            <Pie
              
              data={schartData}
              dataKey="calls"
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
                    {payload.calls}
                  </text>
                );
              }}
              nameKey="type"
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
