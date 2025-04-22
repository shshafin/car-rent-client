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

export const columns = [
  { name: "PICKUP LOCATION", uid: "pickupLocation" },
  { name: "DROP LOCATION", uid: "dropLocation" },
  { name: "CAR PRICING", uid: "carPricing" },
  { name: "ACTIONS", uid: "actions" },
];

export default function PackageTable({
  packages,
  setSelectedPackages,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const renderCell = (pkg: any, columnKey: any) => {
    switch (columnKey) {
      case "pickupLocation":
        return pkg.pickupLocation?.city || "N/A";
      case "dropLocation":
        return pkg.dropLocation?.city || "N/A";
      case "carPricing":
        return (
          <div className="flex flex-col gap-1">
            {pkg.carPricing?.map((pricing: any, index: number) => (
              <div
                key={index}
                className="text-sm">
                {pricing?.car?.model} - {pricing.fare}
              </div>
            ))}
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedPackages(pkg);
                  onEditOpen();
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip
              content="Delete"
              className="bg-rose-600">
              <span
                onClick={() => {
                  setSelectedPackages(pkg);
                  onDeleteOpen();
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return pkg[columnKey] || "N/A";
    }
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="Package Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              width={column.uid === "carPricing" ? "40%" : undefined}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={packages?.data || []}>
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
