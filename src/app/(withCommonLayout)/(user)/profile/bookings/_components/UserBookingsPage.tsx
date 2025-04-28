"use client"

import { DataEmpty, DataError, DataLoading } from "@/src/app/(withCommonLayout)/(admin)/admin/_components/DataFetchingStates";
import { useGetUserAllBookings } from "@/src/hooks/booking.hook";
import BookingsTable from "./BookingsTable";

const UserBookingPage = () =>{
    const {data: bookings, isLoading, isError}  = useGetUserAllBookings();
    return(
    <div className="px-1 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          My Bookings
        </h1>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {bookings?.data?.length === 0 && <DataEmpty />}

      {bookings?.data && (
        <BookingsTable
          bookings={bookings?.data}
        />
      )}
    </div>
    )
}

export default UserBookingPage;