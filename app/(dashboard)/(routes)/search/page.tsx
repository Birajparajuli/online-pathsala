import { getCourses } from "@/actions/get-courses";
import { auth } from "@/auth";
import CoursesList from "@/components/courses-list";
import SearchInput from "@/components/search-input";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Categories from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session = await auth();
  let userId = session?.user?.id;
  // let userId = "user_2c7WDRhRgaTXgF3G3JIaInZbQD4";

  if (!userId) {
    return redirect("/");
  }
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });
  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-x-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
