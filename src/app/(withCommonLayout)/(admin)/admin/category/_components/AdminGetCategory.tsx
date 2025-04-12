import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Trash2 } from "react-feather"; // Importing icons for the actions
import { useGetCategories } from "@/src/hooks/categories.hook";
import { Pencil } from "lucide-react";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "SLUG", uid: "slug" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "IMAGE", uid: "image" },
  { name: "ACTIONS", uid: "actions" },
];

export default function CategoriesTable() {
  const { data: categories, isLoading, isError } = useGetCategories(); // Get existing categories

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
          <img
            src={category.image}
            alt={category.name}
            className="w-16 h-16 object-cover rounded"
          />
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onPress={() => alert("Edit logic here")}
              className="text-blue-500">
              <Pencil size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              color="danger"
              className="text-red-500">
              <Trash2 size={16} />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="Categories Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={categories}>
          {(item: any) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
