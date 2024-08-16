
import { db } from "@/lib/db";


export const getCoursesHome = async () => {
	try {
		const courses = await db.course.findMany({

			where: {
				isPublished: true,
				approvalStatus: 'APPROVED',
			},

			include: {
				category: true,
			},
			orderBy: {
				createdAt: "desc",
                
			},
            take:4
            
		});
		return courses;
	} catch (error) {
		console.log("[GET_COURSES_HOME]", error);
		return [];
	}
};
