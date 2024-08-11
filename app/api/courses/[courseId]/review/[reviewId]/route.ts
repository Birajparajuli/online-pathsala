import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
	req: Request,
	{ params }: { params: { courseId: string; reviewId: string } }
) {
	try {
		const session = await auth()
		const userId = session?.user?.id;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const courseOwner = await db.courseRatting.findUnique({
			where: {
				id: params.reviewId,
				userId: userId,
			},
		});

		if (!courseOwner) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const review = await db.courseRatting.delete({
			where: {
				id: params.reviewId,
				userId_courseId: {
					userId,
					courseId: params.courseId,
				},
			},
		});

		return NextResponse.json(review);
	} catch (error) {
		console.log("[REVIEW_DELETE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
