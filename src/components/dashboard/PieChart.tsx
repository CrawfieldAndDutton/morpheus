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

  
  const [panCall , setPanCall] = useState(0);
  const [dlCall , setdlCall] = useState(0);
  const [passportCall , setPassportCall] = useState(0);
  const [rcCall , setRcCall] = useState(0);
  const [voterCall , setVoterCall] = useState(0);
  
  


  //used to get the data whenever the user comes to dashboard
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await dashboardApi.getTotalCredits();
        setPanCall(response.data.result?.KYC_PAN || null)
        setdlCall(response.data.result?.KYC_DL || null)
        setPassportCall(response.data.result?.KYC_PASSPORT || null)
        setVoterCall(response.data.result?.KYC_VOTER || null)
        setRcCall(response.data.result?.KYC_RC || null)
        

      } catch (err) {
        console.log("error in fetching dashboard")
      } 
    };
    fetchData();
    
  }, []);
  
  const dashboardData = [
    { type: "PAN", calls: panCall },
    { type: "VOTER", calls:  voterCall },
    { type: "RC", calls: rcCall },
    { type: "PASSPORT", calls: passportCall },
    { type: "DRIVING LICENSE", calls: dlCall }
  ]

  
  //sorting the data to map it with the colors array
  const sortedChartData = [...dashboardData].sort((a, b) => b.calls - a.calls);
  
  //colors deep to light
  const fillColors = [
    "hsl(44, 90%, 50.3%)",
    "hsl(44, 90%, 60%)" ,
    "hsl(44, 90%, 63%)" ,
    "hsl(44, 90%, 70%)" ,
    "hsl(44, 90%, 82%)",
    
  ]

  //mapping the colors with the coming values
  const schartData = sortedChartData.map((item, index :number) => ({
    ...item,
    fill: fillColors[index], // Default to last color if out of range
  }));

  
  
  //not using anything
  const chartConfig: ChartConfig = {
    
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
