import { NotificationIcon } from "@/assets/icons/header/notification.icon";
import { Badge } from "@nextui-org/badge";
import { useTheme } from "next-themes";
import { UserDropdown } from "./customs/user-dropdown";
import { Switch } from "@nextui-org/switch";
import { THEME } from "@/types/enums/general";
import { useEffect, useState } from "react";
import { SunIcon } from "@/assets/icons/header/sun.icon";
import { MoonIcon } from "@/assets/icons/header/moon.icon";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { setTheme, theme } = useTheme();
  const { pathname } = useLocation();
  const [themeMode, setThemeMode] = useState(
    theme === THEME.LIGHT ? true : false
  );
  useEffect(() => {
    setThemeMode(theme === THEME.LIGHT ? true : false);
  }, []);

  const generateHeaderTitle = (value: string) => {
    const title: { [key: string]: string } = {
      "/add-management": "E'lon turlarini boshqarish (VIP,SILVER,STANDART) ",
    };

    return title?.[value];
  };

  return (
    <div className="dark:bg-[#090e14] bg-white h-[73px] px-4 flex items-center shadow-md justify-between dark:border-b-1 dark:border-solid dark:border-[#13181d]">
      <h1 className="text-lg">{generateHeaderTitle(pathname)}</h1>
      <div className="flex items-center gap-6">
        <Switch
          color="success"
          size="lg"
          isSelected={themeMode}
          onChange={(e) => {
            if (e.target.checked) {
              setTheme(THEME.LIGHT);
              setThemeMode(true);
            } else {
              setTheme(THEME.DARK);
              setThemeMode(false);
            }
          }}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        ></Switch>
        <Badge color="danger" content={5} isInvisible={false} shape="circle">
          <NotificationIcon className="fill-current" size={30} />
        </Badge>
        <UserDropdown />
      </div>
    </div>
  );
};
