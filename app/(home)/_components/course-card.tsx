import StarRatingValue from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/star-rating-value";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  totalReview: number;
  imageUrl: string;
  price: number;
  category: string;
}
const CourseCardHome = ({
  id,
  imageUrl,
  title,
  totalReview,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-md p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill src={imageUrl} alt={title} className="object-cover" />
        </div>
        <div className="pt-3 text-sm text-purple-950  font-black flex justify-start items-center gap-x-3 content-center">
          {totalReview}
          <StarRatingValue starSize={"text-2xl"} value={totalReview} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-purple-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs to-muted-foreground">{category}</p>
        </div>
      </div>
    </Link>
  );
};
export default CourseCardHome;
