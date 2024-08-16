import { getCoursesHome } from "@/actions/get-courses-home";
import CourseCardHome from "./course-card";

const HomeCourseList = async () => {
  const courses = await getCoursesHome();
  console.log(courses);
  return (
    <div className="bg-white py-10 px-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Discover Latest Courses
        </h2>
      </div>
      <div className="gap-4  grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-42xl:grid-cols-4 mt-4 ">
        {courses.map((item) => (
          <CourseCardHome
            key={item.id}
            title={item.title}
            price={item.price}
            category={item.category?.name}
            imageUrl={item.imageUrl}
            totalReview={item.totalRating}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
};
export default HomeCourseList;
