"use client";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ArrowLeft, LogIn, LogOut, MoveRight, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchInput from "./search-input";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  const isSearchPage = pathname === "/search";
  const { userId } = useAuth();
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isCoursePage && (
          <Link
            href={`/search`}
            className="flex items-center text-sm hover:opacity-75 transition "
          >
            <Button size="sm" variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to course
            </Button>
          </Link>
        )}
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              <MoveRight className="text-red-800" /> Teacher mode
            </Button>
          </Link>
        ) : null}
        {!userId && (
          <>
            <Link href="/sign-in">
              <Button size="sm" variant="ghost">
                <LogIn className="text-purple-700" />
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" variant="ghost">
                <User className="text-purple-700" />
                Sign up
              </Button>
            </Link>
          </>
        )}
        {/* this help when we logout it will not redirect to clerk site */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
