import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs";
import InfoCard from "./_components/iInfo-card";

import { getCoursesDashboard } from "@/actions/get-courses-dashboard";
import CoursesListDashboard from "@/components/courses-list-dashboard";
import SearchInput from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { CheckCircle, Clock } from "lucide-react";
import Categories from "../search/_components/categories";
interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const Dashboard = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();
  // let userId = "user_2c7WDRhRgaTXgF3G3JIaInZbQD4";
  // const user = await currentUser();
  console.log("searchParams =>", searchParams.categoryId);

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });
  const courseTotal = await db.course.count({
    where: {
      isPublished: true,
    },
  });
  console.log(courseTotal);
  const courses = await getCoursesDashboard({
    ...searchParams,
  });
  console.log(courses);
  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId!
  );

  // const { completedCourses, coursesInProgress } = await getDashboardCourses(
  // 	user?.id!
  // );

  return (
    <>
      {/* <DashboardCarousel /> */}

      {userId && (
        <div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InfoCard
                icon={Clock}
                label="In Progress"
                numberOfItems={coursesInProgress.length}
              />
              <InfoCard
                icon={CheckCircle}
                label="Completed"
                numberOfItems={completedCourses.length}
                variant="success"
              />
            </div>
            {/* <CoursesList items={[...coursesInProgress, ...completedCourses]} /> */}
          </div>
        </div>
      )}
      <div className="px-6 space-x-4">
        <div className="p-6 md:mb-0 block">
          <SearchInput />
        </div>
        <div className="space-y-7 p-6">
          <Categories items={categories} />
        </div>
        <Separator />
        <div className="space-y-7 p-6">
          <CoursesListDashboard items={courses} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
