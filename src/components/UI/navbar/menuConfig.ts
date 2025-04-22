export const menuConfig: any = {
  admin: [
    { key: "dashboard", label: "Dashboard", path: "/admin" },
    { key: "manageUsers", label: "Manage Users", path: "/admin/users" },
  ],
  user: [{ key: "profile", label: "Profile", path: "/profile" }],
  common: [{ key: "logout", label: "Logout", path: null, isDanger: true }],
};
