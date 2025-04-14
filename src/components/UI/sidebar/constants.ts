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
    ],
  },
];

export const adminLinks = [
  {
    label: "Dashboard",
    links: [
      {
        href: "/admin",
        label: "Admin Home",
        icon: React.createElement(HomeIcon, { className: "w-5 h-5" }), // Home icon for dashboard
      },
    ],
  },
  {
    label: "Category Management",
    links: [
      {
        href: "/admin/category",
        label: "Category",
        icon: React.createElement(Grid2X2Plus, { className: "w-5 h-5" }), // File icon for category
      },
      {
        href: "/admin/driving-type",
        label: "Driving Type",
        icon: React.createElement(TruckIcon, { className: "w-5 h-5" }), // Truck icon for driving type
      },
    ],
  },
  {
    label: "Vehicle Management",
    links: [
      {
        href: "/admin/make",
        label: "Make",
        icon: React.createElement(Settings2, { className: "w-5 h-5" }), // File icon for make
      },
      {
        href: "/admin/model",
        label: "Model",
        icon: React.createElement(Blend, { className: "w-5 h-5" }), // File icon for model
      },
      {
        href: "/admin/year",
        label: "Year",
        icon: React.createElement(CalendarCog, { className: "w-5 h-5" }), // File icon for year
      },
      {
        href: "/admin/trim",
        label: "Trim",
        icon: React.createElement(ScissorsLineDashed, { className: "w-5 h-5" }), // File icon for tyre size
      },
    ],
  },
];
