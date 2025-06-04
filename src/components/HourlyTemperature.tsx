import { ForecastData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

interface HourlyTempProps {
  data: ForecastData;
}

const HourlyTemp = ({ data }: HourlyTempProps) => {
  const chartData = data.list.slice(0, 8).map((item) => {
    return {
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feel_like: Math.round(item.main.feels_like),
    };
  });

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°C`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black p-2 rounded shadow-lg">
                        <p className="text-sm text-white">
                          Temperature: {payload[0].value}°C
                        </p>
                        <p className="text-sm text-gray-500">
                          Feels like: {payload[1].value}°C
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type={"monotone"}
                dataKey={"temp"}
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type={"monotone"}
                dataKey={"feel_like"}
                stroke="#64748b"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemp;
