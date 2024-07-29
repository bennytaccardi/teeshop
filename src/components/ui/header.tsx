import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  handleModal: () => void;
  handleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  handleModal,
  handleDarkMode,
  darkMode,
}) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-muted">
      <div className="flex items-center">
        <Image
          src="/images/shirts-letters.svg"
          alt="Code Tee"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="text-lg font-bold">Code Tee</span>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {["Shop", "Features", "About"].map((item) => (
            <NavigationMenuItem key={item}>
              <NavigationMenuLink
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                href="#"
              >
                {item}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <NavigationMenuLink
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              href="#"
              onClick={handleModal}
            >
              Test Your Code
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button variant="default" onClick={handleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </header>
  );
};

export default Header;
