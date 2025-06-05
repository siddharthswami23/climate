import { useTheme } from "@/context/theme-provider";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
    // console.log(theme);

  return (
    <header className="sticky top-0 left-0 z-10 w-full bg-background/90 bg-opacity-80 backdrop-blur-md border-b border-muted py-4 px-4 md:px-8 supports-[backdrop-filter]:bg-background/60">
      <div className="constainer mx-auto h-16 flex items-center justify-between ">
        <Link to="/" className="">
          <img
            src={theme === "dark" ? "/logo.png" : "/logo2.png"}
            alt=""
            className="h-14"
          />
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
