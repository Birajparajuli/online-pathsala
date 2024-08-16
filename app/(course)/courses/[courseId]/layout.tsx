import { getProgress } from "@/actions/get-progress";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseNavbar from "./_components/course-navbar";
import CourseSideBar from "./_components/course-sidebar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const session = await auth();
  const userId = session?.user?.id;
  // let userId = "user_2c7WDRhRgaTXgF3G3JIaInZbQD4";

  if (!userId) {
    return redirect("/sign-in");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!course) {
    redirect("/");
  }
  const progressCount = await getProgress(userId, course.id);
  // console.log(progressCount);
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSideBar course={course} progressCount={progressCount} />
      </div>

      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
