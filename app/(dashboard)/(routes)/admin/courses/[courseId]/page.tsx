import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const AdminCourseViewPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || session.user.role !== "ADMIN") {
    return redirect("/dashboard");
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
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/admin/courses");
  }
  return (
    <div className="p-6">
      <Link href="/admin/courses">
        <Button variant="secondary">
          <ArrowLeft />
        </Button>
      </Link>
      <div className=" py-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {course?.title}
        </h1>
        <p>{course?.description}</p>
        <p className="font-bold mt-3">NRS.{course?.price}</p>
      </div>
      <div className="p-5 bg-gray-50 rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
          Chapters
        </h2>
        {course?.chapters.map((chapter, index) => {
          return (
            <div key={index} className="mb-3 border-b-2 pb-3">
              <Badge>
                <p>Chapter:{index + 1}</p>
              </Badge>
              <p className="font-bold text-lg">{chapter.title}</p>
              <p>{chapter.description}</p>
              <video src={chapter?.videoUrl} controls className="pt-2"></video>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AdminCourseViewPage;
