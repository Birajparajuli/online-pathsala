import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session = await auth()
		const userId = session?.user?.id;
		const { courseId } = params;
		const values = await req.json();
		// console.log(courseId);
		// console.log("[COURSE_ID]", courseId);

		if (!userId || session.user.role !== "ADMIN") {
			return new NextResponse("Unauthorized ", { status: 401 });
		}
		const course = await db.course.update({
			where: {
				id: courseId,
				
			},
			data: {
				...values,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSE_ID]", error);
		return new NextResponse("Internal Error ", { status: 500 });
	}
}