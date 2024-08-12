"use client";
import StarRatingValue from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/star-rating-value";
import TimeStampForm from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/time-stamp-form";
import { useSession } from "next-auth/react";
import { Preview } from "./preview";

interface UserProfileReviewProps {
  review: string;
  reviewValue: number;
  createdAt: Date;
}
const UserProfileReview = ({
  review,
  reviewValue,
  createdAt,
}: UserProfileReviewProps) => {
  const session = useSession();
  const user = session?.data?.user || null;
  console.log("user", user);

  // if (!isLoaded || !isSignedIn) {
  // 	return null;
  // }
  const name = user?.name || "Jhon Timalsina";
  const initials = `${name.charAt(0, 1)}`;
  return (
    <>
      {/* <Image
				width={100}
				height={100}
				src={
					user?.imageUrl
						? user.imageUrl
						: `https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
				}
				className="w-12 h-12 rounded-full"
				alt="user profile"
			/> */}

      <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center">
        <span className="text-lg font-bold">{initials}</span>
      </div>
      <div>
        <p className="text-[15px] text-[#333] font-bold">
          {user?.name ? user?.name : "Unknown user"}
        </p>
        <p className="flex items-center gap-x-4 text-xs text-gray-500 mt-0.5">
          <StarRatingValue starSize="text-xl" value={reviewValue!!} />
          <TimeStampForm createdAt={createdAt} />
        </p>
      </div>

      <div className="bg-slate-100 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <Preview value={review!} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileReview;
