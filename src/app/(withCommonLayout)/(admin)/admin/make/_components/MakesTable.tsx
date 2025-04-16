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
import { IMake } from "@/src/types";

export const columns = [
  { name: "MAKE", uid: "make" },
  { name: "LOGO", uid: "logo" },
  { name: "ACTIONS", uid: "actions" },
];

export default function MakesTable({
  makes,
  setSelectedMake,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const renderCell = (make: any, columnKey: any) => {
    const cellValue = make[columnKey];

    switch (columnKey) {
      case "make":
        return make.make;
      case "logo":
        return make.logo;

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedMake(make);
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
                  setSelectedMake(make);
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
      <Table aria-label="makes Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={makes.data}>
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
