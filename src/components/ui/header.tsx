import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

interface HeaderProps {
  handleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ handleDarkMode, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = ["Shop", "Features", "About", "Test Your Code"];

  return (
    <header className="bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className="flex items-center">
              <Image
                src="/images/shirts-letters.svg"
                alt="Code Tee"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="text-lg font-bold">Code Tee</span>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item}>
                    <NavigationMenuLink
                      className="group inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                      href="#"
                    >
                      {item}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Button variant="ghost" onClick={handleDarkMode} className="mr-4">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
            <UserButton />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
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
                <div className="-mr-2">
                  <Button variant="ghost" onClick={toggleMenu}>
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {menuItems.map((item) => (
                    <a
                      key={item} // Add the 'a' tag and 'key' prop here
                      href="#"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <Button
                variant="ghost"
                onClick={handleDarkMode}
                className="w-full"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <div className="flex justify-center">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
