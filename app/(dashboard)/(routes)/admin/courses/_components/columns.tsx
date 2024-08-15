"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, Pencil } from "lucide-react";
import Link from "next/link";
import CourseStatusEditForm from "./status-edit-form";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",

    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NPR",
      }).format(price);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval Status",
    cell: ({ row }) => {
      const approvalStatus = row.getValue("approvalStatus") || false;
      let badgeClass = "bg-slate-500"; // Default class

      switch (approvalStatus) {
        case "APPROVED":
          badgeClass = "bg-green-500";
          break;
        case "REJECTED":
          badgeClass = "bg-red-500";
          break;
        case "PENDING":
          badgeClass = "bg-yellow-600";
          break;
        default:
          badgeClass = "bg-slate-500";
      }
      return (
        <Badge className={cn(badgeClass)}>
          {approvalStatus.toString().toUpperCase()}
        </Badge>
      );
    },
  },
  {
    id: "view",
    header: "View",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Link href={`/admin/courses/${id}`}>
          <EyeIcon />
        </Link>
      );
    },
  },

  {
    id: "actions",
    header: "Edit",
    cell: ({ row }) => {
      const { id, title, approvalStatus, approvalMessages } = row.original;

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
                Editing <span className="text-primary">{title}</span>
              </DialogTitle>
              <CourseStatusEditForm
                status={approvalStatus}
                id={id}
                approvalMessage={approvalMessages || " "}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
