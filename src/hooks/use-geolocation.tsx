import { useEffect, useState } from "react";
import type { Coordinates } from "@/api/types";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setlocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setlocationData((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    if (!navigator.geolocation) {
      setlocationData({
        coordinates: null,
        error: "geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setlocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        setlocationData({
          coordinates: null,
          error: error.message,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
