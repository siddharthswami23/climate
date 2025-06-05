import type { ForecastData } from "../api/types";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  temp_min: number;
  temp_max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  humidity: number;
  wind: number;
  date: number;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const formatTemp = (temp: number) => {
    return `${Math.round(temp)}°C`;
  };

  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        weather: forecast.weather[0],
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecast).slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>5 Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {nextDays.map((day) => {
          return (
            <div
              key={day.date}
              className="my-3 grid grid-cols-1 lg:grid-cols-3 items-center gap-4 rounded-lg border p-4"
            >
              <div>
                <p className="font-medium ">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="capitalize text-sm text-muted-foreground">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              <div className="flex justify-end gap-4">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.humidity}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.wind}</span>
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
