import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "./lib/db"
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [Google],
    callbacks: {
        async session({ session, user }) {
          // Include the user's role in the session object
          session.user.role = user.role;
          return session;
        },
      },
})