import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
      className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300 ${
        isDark ? "rotate-180" : "rotate-0"
      }`}
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
      ) : (
        <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
      )}
    </div>
  );
};

export default ThemeToggle;
