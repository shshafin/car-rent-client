"use client";

import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@heroui/table";
import { Trash2, Pencil } from "lucide-react";
import { ICategory } from "@/src/types";
import { useGetCategories } from "@/src/hooks/categories.hook";

export default function AdminCategoryPage() {
  const queryClient = useQueryClient();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const {data: categories, isLoading, isError} = useGetCategories();

  const addCategory = useMutation({
    mutationFn: (data: typeof newCategory) =>
      axios.post("/api/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onOpenChange();
      setNewCategory({ name: "", slug: "", description: "" });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this category?");
    if (confirmed) deleteCategory.mutate(id);
  };

  console.log({categories, isLoading, isError})

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button onPress={onOpen} color="primary" className="rounded">
          + Add Category
        </Button>
      </div>

      {isLoading && <p>Loading categories...</p>}
      {isError && <p>Failed to load categories.</p>}
      {categories && categories?.data?.length === 0 && (
        <p>No categories found.</p>
      )}

      {!isLoading && categories?.data?.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.data.map((category: ICategory) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  {category.parentCategory?.name || "—"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => alert("Edit logic here")}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="danger"
                    onPress={() => handleDelete(category._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input
            label="Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <Input
            label="Slug"
            value={newCategory.slug}
            onChange={(e) =>
              setNewCategory({ ...newCategory, slug: e.target.value })
            }
          />
          <Input
            label="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({
                ...newCategory,
                description: e.target.value,
              })
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onOpenChange}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={() => addCategory.mutate(newCategory)}
            isLoading={addCategory.isPending}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
