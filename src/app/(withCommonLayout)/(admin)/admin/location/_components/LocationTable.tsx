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
  { name: "LOCATION", uid: "location" },
  { name: "COUNTRY", uid: "country" },
  { name: "STATE", uid: "state" },
  { name: "CITY", uid: "city" },
  { name: "ZIPCODE", uid: "zipCode" },
  { name: "ACTIONS", uid: "actions" },
];

export default function LocationTable({
  Locations,
  setSelectedLocation,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const renderCell = (item: any, columnKey: any) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "location":
        return item?.location;
      case "country":
        return item?.country;
      case "state":
        return item?.state;
      case "city":
        return item?.city;
      case "zipCode":
        return item?.zipCode;
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedLocation(item);
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
                  setSelectedLocation(item);
                  onDeleteOpen();
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="locations table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={Locations || []}>
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
