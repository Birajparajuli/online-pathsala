import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="w-full" variant="outline">
        <FcGoogle className="mr-3" />
        Sign in with Google
      </Button>
    </form>
  );
}
