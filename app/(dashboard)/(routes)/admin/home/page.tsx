import { getAdminAnalytics } from "@/actions/get-analytics";
import DataCard from "../../teacher/analytics/_components/data-card";

const AdminHome = async () => {
  const { data, totalSale, totalUsers, totalCourses, totalActiveCourse } =
    await getAdminAnalytics();

  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <DataCard label="Total Users" value={totalUsers} />
        <DataCard label="Total Courses" value={totalCourses} />
        <DataCard label="Active Courses" value={totalActiveCourse} />
        <DataCard label="Total Sales" value={totalSale} />
      </div>
    </div>
  );
};
export default AdminHome;
