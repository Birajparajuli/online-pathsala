"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MessageCircle,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    // header: "Title",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    id: "adminMessage",
    header: "Admin Message",
    cell: ({ row }) => {
      const { id, approvalMessages } = row.original;

      return (
        <Popover>
          <PopoverTrigger>
            <MessageCircle />
          </PopoverTrigger>
          <PopoverContent>{approvalMessages}</PopoverContent>
        </Popover>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className=" h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
