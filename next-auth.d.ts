import "next-auth";

declare module "next-auth" {
  // Define the possible user roles as a union type
  type UserRole = "TEACHER" | "ADMIN" | "STUDENT" | "GUEST";

  // Extend the existing User interface
  interface User {
    role: UserRole;
  }

  // Extend the existing Session interface
  interface Session {
    user: {
      role: UserRole;
    } & Omit<NextAuth.Session["user"], "role">; // Include any other properties if needed
  }
}
