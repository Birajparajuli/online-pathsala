import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import InfoCard from "./_components/iInfo-card";

import { getCoursesDashboard } from "@/actions/get-courses-dashboard";
import { auth } from "@/auth";
import CoursesListDashboard from "@/components/courses-list-dashboard";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const Dashboard = async ({ searchParams }: SearchPageProps) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in?callbackUrl=/dashboard");
  }
  let userId = session?.user?.id;

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
    userId,
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
                label="Course In Progress"
                numberOfItems={coursesInProgress.length}
              />
              <InfoCard
                icon={CheckCircle}
                label="Course Completed"
                numberOfItems={completedCourses.length}
                variant="success"
              />
            </div>
            {/* <CoursesList items={[...coursesInProgress, ...completedCourses]} /> */}
          </div>
        </div>
      )}
      <div className="px-6">
        <div className=" md:mb-0 block">
          <h3 className="text-xl font-bold">Purchased Courses</h3>
        </div>
        <div className=" pt-4">{/* <Categories items={categories} /> */}</div>
        <Separator />
        <div className="space-y-7 pt-4">
          <CoursesListDashboard items={courses} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
