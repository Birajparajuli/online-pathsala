import { getAdminAnalytics } from "@/actions/get-analytics";
import DataCard from "../../teacher/analytics/_components/data-card";

const AdminHome = async () => {
  const {
    data,
    totalSale,
    totalUsers,
    totalCourses,
    totalActiveCourse,
    totalRevenue,
  } = await getAdminAnalytics();

  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Users" value={totalUsers} />
        <DataCard label="Total Courses" value={totalCourses} />
        <DataCard label="Active Courses" value={totalActiveCourse} />
        <DataCard label="Total Sales" value={totalSale} />
        <DataCard label="Total Revenue (NRS)" value={totalRevenue} />
      </div>
    </div>
  );
};
export default AdminHome;
