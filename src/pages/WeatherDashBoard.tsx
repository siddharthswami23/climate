import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForeCastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCcw, RefreshCw } from "lucide-react";
import { useState } from "react";

const WeatherDashBoard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  // console.log(coordinates);

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForeCastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <LoadingSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button
            onClick={getLocation}
            variant={"outline"}
            className="w-fit cursor-pointer "
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
          <p>Please enable location access to see your local weather</p>
          <Button
            onClick={getLocation}
            variant={"outline"}
            className="w-fit cursor-pointer "
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];
  // console.log(locationName);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Failed to fetch weather data. Please try again!</p>
          <Button
            onClick={handleRefresh}
            variant={"outline"}
            className="w-fit cursor-pointer "
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight capitalize">
          my location
        </h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          //  disabled={}
        >
          <span className="sr-only">Refresh</span>
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetched ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <CurrentWeather data={weatherQuery.data} locationName={locationName} />
        <HourlyTemperature data={forecastQuery.data} />
      </div>
    </div>
  );
};

export default WeatherDashBoard;
