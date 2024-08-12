"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import UserEditForm from "./_components/user-edit-form";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, name, role } = row.original;

      return (
        <Dialog>
          <DialogTrigger>
            <div className="flex gap-2 px-4 py-2 bg-gray-300 rounded-md">
              <Pencil className=" h-4 w-4 mr-2" />
              Edit
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Editing <span className="text-primary">{name}</span>
              </DialogTitle>
              <UserEditForm id={id} role={role} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
