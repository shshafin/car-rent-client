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
  { name: "FULL NAME", uid: "fullName" },
  { name: "EMAIL", uid: "email" },
  { name: "PHONE", uid: "phone" },
  { name: "COUNTRY", uid: "country" },
  { name: "CITY", uid: "city" },
  { name: "ADDRESS", uid: "address" },
  // { name: "ACTIONS", uid: "actions" },
];

export default function UsersTable({
  users,
  onEditOpen,
  onDeleteOpen,
  setSelectedUser,
}: any) {
  const renderCell = (user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "fullName":
        return user.fullName;
      case "email":
        return user.email;
      case "phone":
        return user.phone;
      case "country":
        return user.country;
      case "city":
        return user.city;
      case "address":
        return user.address;

      // case "actions":
      //   return (
      //     <div className="flex justify-center items-center gap-2">
      //       {/* <Tooltip content="Edit">
      //         <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
      //           <EditIcon />
      //         </span>
      //       </Tooltip> */}
      //       <Tooltip
      //         content="Delete"
      //         className="bg-rose-600">
      //         <span
      //           onClick={() => {
      //             setSelectedUser(user);
      //             onDeleteOpen();
      //           }}
      //           className="text-lg text-danger cursor-pointer active:opacity-50">
      //           <DeleteIcon />
      //         </span>
      //       </Tooltip>
      //     </div>
      //   );
      default:
        return cellValue;
    }
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="drivingTypes Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users.data}>
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
