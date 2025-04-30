import { Metadata } from "next";
import PackageBookingsPage from "./_components/PackageBookingsPage";
export const metadata: Metadata = {
  title: "Package Bookings - Admin",
};

const page = () => {
  return (
    <div>
      <PackageBookingsPage />
    </div>
  );
};

export default page;
