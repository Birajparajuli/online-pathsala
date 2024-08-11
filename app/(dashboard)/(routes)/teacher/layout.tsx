import { auth } from "@/auth";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session?.user.role !== "TEACHER" || session?.user.role !== "ADMIN") {
    return redirect("/dashboard");
  }
  return <>{children}</>;
};

export default TeacherLayout;
