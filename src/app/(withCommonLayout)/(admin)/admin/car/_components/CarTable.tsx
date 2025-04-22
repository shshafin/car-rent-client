import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { DeleteIcon, EditIcon } from "@/src/icons";
import { Tooltip } from "@heroui/tooltip";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "MODEL", uid: "model" },
  { name: "SEATS", uid: "seats" },
  { name: "BAGS", uid: "bags" },
  { name: "IMAGE", uid: "image" },
  { name: "ACTIONS", uid: "actions" },
];

export default function CarTable({
  cars,
  onEditOpen,
  onDeleteOpen,
  setSelectedCar,
}: any) {
  const renderCell = (car: any, columnKey: any) => {
    const cellValue = car[columnKey];

    switch (columnKey) {
      case "name":
        return car.name;
      case "model":
        return car.model;
      case "seats":
        return car.seats;
      case "bags":
        return car.bags;
      case "image":
        return car.image;
      // return (
      //   <div className="w-20 h-20 overflow-hidden rounded-lg">
      //     <img
      //       src={cellValue}
      //       alt={car.name}
      //       className="w-full h-full object-cover"
      //     />
      //   </div>
      // );
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedCar(car);
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
                  setSelectedCar(car);
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
      <Table aria-label="cars table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={cars}>
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
