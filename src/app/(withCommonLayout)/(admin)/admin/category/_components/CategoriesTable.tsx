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

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "SLUG", uid: "slug" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "IMAGE", uid: "image" },
  { name: "ACTIONS", uid: "actions" },
];

export default function CategoriesTable({ categories }: any) {

  const renderCell = (category: any, columnKey: any) => {
    const cellValue = category[columnKey];

    switch (columnKey) {
      case "name":
        return category.name;
      case "slug":
        return category.slug;
      case "description":
        return category.description;
      case "image":
        return (
          <div>
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            {/* <Tooltip content="Edit user"> */}
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            {/* </Tooltip> */}
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">

            <DeleteIcon onClick={() => alert("Delete logic here")} />
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="Categories Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={categories.data}>
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
