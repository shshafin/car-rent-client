import { Metadata } from "next";
import TourBookingPage from "./_components/tour-booking-page";

export const metadata: Metadata = {
    title: "Tour Booking"
}

const page = () =>{
    return <div><TourBookingPage /></div>
}

export default page;