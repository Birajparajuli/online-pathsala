import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const ProfileDropdown = () => {
  const session = useSession();
  console.log(session);
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-9 w-9 rounded-full">
            <AvatarImage src={session.data?.user.image || ""} />
            <AvatarFallback className=" uppercase font-bold h-9 w-9 rounded-full bg-white">
              {session.data?.user.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {session.data?.user.role === "ADMIN" && (
            <Link href="/admin">
              <DropdownMenuItem className=" cursor-pointer">
                Admin
              </DropdownMenuItem>
            </Link>
          )}
          <Link href="/account">
            <DropdownMenuItem className=" cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
          <DropdownMenuItem className=" cursor-pointer p-0">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ProfileDropdown;
