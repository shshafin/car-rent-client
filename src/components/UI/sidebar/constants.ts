import {
  UserIcon,
  SettingsIcon,
  HomeIcon,
  FileIcon,
  TruckIcon,
  Settings2,
  Blend,
  CalendarCog,
  ScissorsLineDashed,
  Grid2X2Plus,
  LoaderPinwheel,
  User,
  Home,
  Users,
  Car,
  MapPin,
  Package,
  Calendar,
  CarIcon,
  TimerReset,
} from "lucide-react"; // Import necessary icons
import React from "react";

export const userLinks = [
  {
    label: "Profile",
    links: [
      {
        href: "/profile",
        label: "Profile",
        icon: React.createElement(UserIcon, { className: "w-5 h-5" }), // User icon for profile
      },
      {
        href: "/profile/settings",
        label: "Settings",
        icon: React.createElement(SettingsIcon, { className: "w-5 h-5" }), // Settings icon
      },
      {
        href: "/profile/change-password",
        label: "Change Password",
        icon: React.createElement(TimerReset, { className: "w-5 h-5" }), // Settings icon
      },
    ],
  },
  {
    label: "Bookings",
    links: [
      {
        href: "/profile/bookings",
        label: "Bookings",
        icon: React.createElement(CarIcon, { className: "w-5 h-5" }), // User icon for profile
      },
    ],
  },
];

export const adminLinks = [
  {
    label: "Dashboard",
    links: [
      {
        href: "/admin",
        label: "Dashboard Home",
        icon: React.createElement(Home, { className: "w-5 h-5" }), // Home icon for dashboard
      },
    ],
  },
  {
    label: "User Management",
    links: [
      {
        href: "/admin/users",
        label: "Manage Users",
        icon: React.createElement(Users, { className: "w-5 h-5" }), // Users icon for user management
      },
    ],
  },
  {
    label: "System Management",
    links: [
      {
        href: "/admin/car",
        label: "Manage Vehicles",
        icon: React.createElement(Car, { className: "w-5 h-5" }), // Car icon for vehicle management
      },
      {
        href: "/admin/location",
        label: "Manage Locations",
        icon: React.createElement(MapPin, { className: "w-5 h-5" }), // Location icon for location management
      },
    ],
  },
  {
    label: "Package Management",
    links: [
      {
        href: "/admin/package",
        label: "Manage Packages",
        icon: React.createElement(Package, { className: "w-5 h-5" }), // Package icon for package management
      },
    ],
  },
];
