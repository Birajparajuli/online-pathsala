import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
export const metadata: Metadata = {
  title: "Pathsala | Course list",
};
const CoursesPage = async () => {
  const session = await auth();
  // console.log(session);
  // console.log(session?.user.role);
  const userId = session?.user.id;
  if (session?.user.role !== "TEACHER") {
    return redirect("/dashboard");
  }
  const course = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <DataTable columns={columns} data={course} />
    </div>
  );
};

export default CoursesPage;
