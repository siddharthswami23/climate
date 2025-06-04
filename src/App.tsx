import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import WeatherDashBoard from "./pages/WeatherDashBoard";
import CityPage from "./pages/CityPage";
import { ThemeProvider } from "./context/theme-provider";
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 min
        retry:false,
        refetchOnWindowFocus: false,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashBoard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
