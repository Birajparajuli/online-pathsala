import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return await db.user.findMany();
}

export default async function AllUsers() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
