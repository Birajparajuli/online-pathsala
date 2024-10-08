import { auth } from "@/auth";
import { CourseProgress } from "@/components/course-progress";
import { db } from "@/lib/db";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
const CourseSideBar = async ({ course, progressCount }: CourseSidebarProps) => {
  const session = await auth();
  const userId = session?.user?.id;
  // let userId = "user_2c7WDRhRgaTXgF3G3JIaInZbQD4";

  if (!userId) {
    return redirect("/");
  }

  console.log(course.id);
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
      paymentStatus: "COMPLETE",
    },
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold text-center">{course.title}</h1>
        {/* check purchase  */}
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSideBar;
