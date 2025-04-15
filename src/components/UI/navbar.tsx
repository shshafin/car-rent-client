import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";

import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/UI/theme-switch";
import { Logo } from "@/src/components/icons";
import { NavbarLogin, NavbarLoginMobile } from "./NavbarLogin";
import { Car, Phone, Search, ShoppingCart } from "lucide-react";

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="2xl"
      position="sticky"
      height={150}>
      {/* Main navbar layout using flexbox for better alignment */}
      <div className="flex items-center justify-between w-full px-4">
        {/* Left: Logo */}
        <div className="flex items-center justify-start">
          <NavbarBrand
            as="li"
            className="gap-3 max-w-fit">
            <NextLink
              href="/"
              className="flex items-center gap-1">
              {/* Logo size, ensuring it doesn't shrink too much on mobile */}
              <Logo className="w-36 sm:w-48 md:w-64 lg:w-1/12 max-w-full" />
            </NextLink>
          </NavbarBrand>
        </div>

        {/* Middle: Nav Items and Need Help Button (stacked vertically on small devices) */}
        <div className="hidden lg:flex justify-center flex-grow flex-col gap-2 ">
          <div className="flex justify-center items-center gap-4">
            {/* Need Help Button */}
            <button className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-300 text-gray-700 rounded-md flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Phone className="h-5 w-5" />
              <span>Need Help?</span>
            </button>

            <ThemeSwitch className="hidden sm:block" />
          </div>

          {/* Divider */}

          <div className="border-t border-gray-500 my-2 w-3/4 mx-28" />

          <div className="mx-auto">
            <ul className="flex gap-4">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    href={item.href}
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                    )}>
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Theme + Login + My Vehicles, Cart, and Search (stacked vertically on mobile) */}
        <div className="flex items-center gap-2 flex-col">
          <div className="flex gap-2 items-center my-2  ">
            <NavbarLogin />

            {/* My Vehicles Option */}
            <div className="flex items-center gap-2 my-2 border-x-1 border-gray-500 px-2">
              <Car size={20} /> {/* Car icon */}
              <span>My Vehicles</span>
            </div>
            <div className="flex items-center gap-2 my-2">
              <ShoppingCart size={20} /> {/* Cart icon */}
            </div>
          </div>
          {/* Divider Between Last Part */}
          <div className="border-t border-gray-500 w-full " />
          {/* Cart and Search Options */}
          <div className="flex items-center gap-4 my-2 w-">
            {/* My Vehicles Option */}
            <div className="flex items-center gap-2 ">
              <span>What can we help you find?</span>
              <Search size={20} /> {/* Search icon */}
            </div>
          </div>
          {/* end */}
        </div>
      </div>

      {/* Mobile nav (only visible on small devices) */}
      <NavbarContent
        className="sm:hidden basis-1 pl-4"
        justify="end">
        <ThemeSwitch /> {/* This will show only on mobile */}
        <NavbarLoginMobile />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile menu list */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
