import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
const HomeNav = async () => {
  const session = await auth();

  return (
    <header className="bg-white shadow-sm rounded-md m-2 mx-4 border border-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <Image src="/logo.png" width={128} height={34} alt="logo" />
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <div className="flex items-center gap-4">
              {session?.user.id ? (
                <div className="sm:flex sm:gap-4">
                  <Link href="/dashboard">
                    <Button variant="outline">Go to Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <Link href="/sign-in">
                    <Button>Login</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="outline">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HomeNav;
