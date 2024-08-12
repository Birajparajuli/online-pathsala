import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WifiIcon } from "lucide-react";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:h-5/6 lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <Badge variant="outline">
            <WifiIcon className="h-4 pr-2" />
            Online
          </Badge>
          <h1 className="text-xl font-extrabold sm:text-5xl">
            पाठशाला
            <strong className="font-extrabold text-primary sm:block">
              Learn Anything, On Your Schedule
            </strong>
          </h1>

          <p className="mt-4 sm:text-lg/relaxed">
            Empowering Students and Teachers with a Diverse Range of Interactive
            and Expert-Led Online Courses Designed to Foster a Passion for
            Learning and Teaching Excellence
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button>Learn New Topic</Button>
            </Link>

            <Link href="/become-teacher">
              <Button variant="secondary">Become a Tutor</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeHero;
