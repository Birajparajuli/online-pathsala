
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
export async function POST(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const userSession = await auth()
		const user = userSession?.user;

		console.log("[USER_FROM_CURRENT_USER]", user);
		if (!user || !user.id) {
			return new NextResponse("Unauthorized No User Found", { status: 401 });
		}

		const course = await db.course.findUnique({
			where: {
				id: params.courseId,
				isPublished: true,
			},
		});

		const purchase = await db.purchase.findUnique({
			where: {
				userId_courseId: {
					userId: user.id,
					courseId: params.courseId,
				},
			},
		});

		if (purchase) {
			return new NextResponse("Already purchased", { status: 400 });
		}

		if (!course) {
			return new NextResponse("Not found", { status: 404 });
		}

		
		return new NextResponse("Hello World")
	} catch (error) {
		console.log("[COURSE_ID_CHECKOUT]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
