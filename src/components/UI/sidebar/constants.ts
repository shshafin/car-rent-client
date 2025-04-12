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
      { href: "/admin/create-makes", label: "Create Makes" },
      { href: "/admin/create-model", label: "Create Model" },
    ],
  },
  {
    label: "Product Management",
    links: [
      { href: "/admin/create-product", label: "Create Product" },
      { href: "/admin/create-tyre-size", label: "Create Tyre Size" },
    ],
  },
];
