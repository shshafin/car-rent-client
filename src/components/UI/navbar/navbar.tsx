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
import Image from "next/image";

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="2xl"
      position="sticky"
      height={90}>
      {/* Main navbar layout */}
      <div className="hidden md:flex items-center justify-between w-full px-4">
        {/* Left: Logo */}
        <div className="flex items-center justify-start">
          <NavbarBrand
            as="li"
            className="gap-2 max-w-fit">
            <NextLink
              href="/"
              className="flex items-center gap-1">
              <Logo />
            </NextLink>
          </NavbarBrand>
        </div>

        {/* Middle: Need Help Button + Nav Items */}
        <div className="hidden md:flex justify-center flex-grow flex-col gap-2">
          <div className="mx-auto">
            <ul className="flex gap-3 md:gap-2">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    href={item.href}
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium text-sm md:text-xs bg-default-100 md:px-1 lg:px-2 py-2 rounded-md"
                    )}>
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Login, My Vehicles, Cart, and Search */}
        <div className="flex flex-row items-center gap-2">
          <ThemeSwitch className="hidden sm:block" />
          <NavbarLogin />
        </div>
      </div>

      {/* Mobile nav */}
      <NavbarContent className="md:hidden px-4">
        <div className="w-full flex justify-between items-center">
          <NavbarBrand
            as="li"
            className="gap-3 max-w-fit">
            <NextLink
              href="/"
              className="flex items-center gap-1">
              <Image
                src={"/logo.png"}
                height={80}
                width={80}
                alt="logo"
              />
            </NextLink>
          </NavbarBrand>
          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <NavbarLoginMobile />
            <NavbarMenuToggle />
          </div>
        </div>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <div className="border-t border-gray-500 mb-2" />
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
