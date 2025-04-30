import { Metadata } from "next";
import TourBookingsPage from "./_components/TourBookingsPage";
export const metadata: Metadata = {
  title: "Tour Bookings - Admin",
};

const page = () => {
  return (
    <div>
      <TourBookingsPage />
    </div>
  );
};

export default page;
