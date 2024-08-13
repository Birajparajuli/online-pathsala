import { db } from "@/lib/db";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const AllCoursesAdmin = async () => {
  const course = await db.course.findMany({
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
export default AllCoursesAdmin;
