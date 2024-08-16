"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { ArrowLeft, LogIn, LogOut, MoveRight, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import ProfileDropdown from "./profile-dropdown";
import SearchInput from "./search-input";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  const isSearchPage = pathname === "/search";
  const session = useSession();
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <Suspense>
            <SearchInput />
          </Suspense>
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
        ) : session.data?.user.role !== "ADMIN" ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="secondary">
              Teacher Mode <MoveRight className="text-gray-800 pl-2" />
            </Button>
          </Link>
        ) : null}
        {!session && (
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

        <ProfileDropdown />
      </div>
    </>
  );
};

export default NavbarRoutes;
