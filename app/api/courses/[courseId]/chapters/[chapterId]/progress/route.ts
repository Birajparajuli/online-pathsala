import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
	req: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) {
	try {
		const session = await auth()
		const userId = session?.user?.id;

		const { isCompleted } = await req.json();
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const userProgress = await db.userProgress.upsert({
			where: {
				userId_chapterId: {
					userId,
					chapterId: params.chapterId,
				},
			},
			update: {
				isCompleted,
			},
			create: {
				userId,
				chapterId: params.chapterId,
				isCompleted,
			},
		});
		return NextResponse.json(userProgress, { status: 201 });
	} catch (error) {
		console.log("[CHAPTER_ID_PROGRESS]", error);
		return new NextResponse("Internal Error");
	}
}
