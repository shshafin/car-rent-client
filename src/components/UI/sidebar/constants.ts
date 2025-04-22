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
    label: "Booking & Packages",
    links: [
      {
        href: "/admin/package",
        label: "Manage Packages",
        icon: React.createElement(Package, { className: "w-5 h-5" }), // Package icon for package management
      },
      {
        href: "/admin/booking",
        label: "Manage Bookings",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }), // Calendar icon for booking management
      },
    ],
  },
  {
    label: "Tour Management",
    links: [
      {
        href: "/admin/adminTour",
        label: "Manage Tours",
        icon: React.createElement(Package, { className: "w-5 h-5" }), // Package icon for package management
      },
    ],
  },
];
