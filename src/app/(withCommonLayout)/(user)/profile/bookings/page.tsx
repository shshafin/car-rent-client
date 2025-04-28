import { Metadata } from "next";
import UserBookingPage from "./_components/UserBookingsPage";

export const metadata: Metadata = {
  title: "My Bookings",
};

const page = () => {
  return (
    <div>
      <UserBookingPage />
    </div>
  );
};

export default page;