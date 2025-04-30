import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon } from "@/src/icons";
import { Chip } from "@heroui/chip";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PICKUP", uid: "pickupLocation" },
  { name: "DROPOFF", uid: "dropoffLocation" },
  { name: "DATES", uid: "dates" },
  { name: "PEOPLE", uid: "numberOfPeople" },
  { name: "PHONE", uid: "phoneNumber" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TourBookingsTable({
  bookings,
  setSelectedBooking,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const renderCell = (booking: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return <p className="font-medium text-sm">{booking.name}</p>;

      case "pickupLocation":
        return <p className="text-sm">{booking.pickupLocation}</p>;

      case "dropoffLocation":
        return <p className="text-sm">{booking.dropoffLocation}</p>;

      case "dates":
        return (
          <div>
            <p className="text-sm font-medium">
              {new Date(booking.pickupDate).toLocaleDateString()} -{" "}
              {new Date(booking.dropoffDate).toLocaleDateString()}
            </p>
            <p className="text-xs text-default-500">
              {booking.pickupTime} to {booking.dropoffTime}
            </p>
          </div>
        );

      case "numberOfPeople":
        return <p className="text-sm">{booking.numberOfPeople}</p>;

      case "phoneNumber":
        return <p className="text-sm">{booking.phoneNumber}</p>;

      case "status":
        return (
          <Chip
            color={getStatusColor(booking.status)}
            variant="flat"
            size="sm"
            className="capitalize"
          >
            {booking.status}
          </Chip>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            {/* <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedBooking(booking);
                  onEditOpen();
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip> */}
            <Tooltip content="Delete" className="bg-rose-600">
              <span
                onClick={() => {
                  setSelectedBooking(booking);
                  onDeleteOpen();
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return booking[columnKey];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="Tour bookings table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={bookings || []}>
          {(item: any) => (
            <TableRow key={item._id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
