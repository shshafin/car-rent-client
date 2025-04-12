export const userLinks = [
  {
    label: "Profile",
    links: [
      { href: "/profile", label: "Profile" },
      { href: "/profile/settings", label: "Settings" },
    ],
  },
];

export const adminLinks = [
  {
    label: "Dashboard",
    links: [{ href: "/admin", label: "Admin Home" }],
  },
  {
    label: "Category Management",
    links: [
      { href: "/admin/category", label: "Category" },
      { href: "/admin/driving-type", label: "Driving Type" },
    ],
  },
  {
    label: "Vehicle Management",
    links: [
      { href: "/admin/make", label: "Make" },
      { href: "/admin/model", label: "Model" },
      { href: "/admin/year", label: "Year" },
      { href: "/admin/tyre-size", label: "Tyre Size" },
    ],
  },
];
