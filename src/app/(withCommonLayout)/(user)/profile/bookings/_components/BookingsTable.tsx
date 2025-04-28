import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table"
import { Chip } from "@heroui/chip"
import { Badge } from "@heroui/badge"
import Image from "next/image"

export const columns = [
  { name: "CAR", uid: "car" },
  { name: "PICKUP", uid: "pickup" },
  { name: "DROPOFF", uid: "dropoff" },
  { name: "DATE & TIME", uid: "datetime" },
  { name: "AMOUNT", uid: "amount" },
  { name: "PAYMENT", uid: "payment" },
  { name: "STATUS", uid: "status" },
]

export default function BookingsTable({ bookings }: { bookings: any[] }) {
  const renderCell = (booking: any, columnKey: any) => {
    switch (columnKey) {
      case "car":
        return (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md overflow-hidden">
              <Image
                src={booking.car.image || "/placeholder.svg"}
                alt={booking.car.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-medium text-sm">{booking.car.name}</p>
              <p className="text-xs text-default-500">{booking.car.model}</p>
            </div>
          </div>
        )
      case "pickup":
        return (
          <div>
            <p className="font-medium text-sm">{booking.pickupLocation.location}</p>
            <p className="text-xs text-default-500">
              {booking.pickupLocation.city}, {booking.pickupLocation.state}
            </p>
          </div>
        )
      case "dropoff":
        return (
          <div>
            <p className="font-medium text-sm">{booking.dropLocation.location}</p>
            <p className="text-xs text-default-500">
              {booking.dropLocation.city}, {booking.dropLocation.state}
            </p>
          </div>
        )
      case "datetime":
        return (
          <div>
            <p className="font-medium text-sm">{new Date(booking.pickUpTime).toLocaleDateString()}</p>
            <p className="text-xs text-default-500">
              {new Date(booking.pickUpTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        )
      case "amount":
        return (
          <div>
            <p className="font-medium text-sm">${booking.totalAmount}</p>
            {booking.paymentType === "partial" && (
              <p className="text-xs text-default-500">
                Paid: ${booking.amountPaid} ({Math.round((booking.amountPaid / booking.totalAmount) * 100)}%)
              </p>
            )}
          </div>
        )
      case "payment":
        return (
          <Badge
            color={booking.paymentType === "partial" ? "warning" : "primary"}
            variant="flat"
            className="capitalize"
          >
            {booking.paymentType}
          </Badge>
        )
      case "status":
        return (
          <Chip color={getStatusColor(booking.paymentStatus)} variant="flat" size="sm" className="capitalize">
            {booking.paymentStatus}
          </Chip>
        )
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success"
      case "pending":
        return "warning"
      case "cancelled":
        return "danger"
      default:
        return "default"
    }
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="Bookings Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "status" || column.uid === "payment" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={bookings || []}>
          {(item: any) => (
            <TableRow key={item._id}>
              {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
