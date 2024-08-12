import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    const user = session?.user?.id;
    const { userId } = params;
    const values = await req.json();
    // console.log(courseId);
    // console.log("[COURSE_ID]", courseId);

    if (!user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized ", { status: 401 });
    }
    const course = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[USER_UPDATE]", error);
    return new NextResponse("Internal Error ", { status: 500 });
  }
}
