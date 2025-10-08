import NextAuth, { type Session, type User as NextAuthUser } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connectDB } from "./dbConnect";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider,
    GoogleProvider,
  ],

  callbacks: {
    // ✅ Type user properly from NextAuth
    async signIn({ user }: { user: NextAuthUser }) {
      await connectDB();

      // Upsert user by email
      await User.findOneAndUpdate(
        { email: user.email },
        { name: user.name, image: user.image },
        { upsert: true }
      );

      return true;
    },

    // ✅ Type session properly from NextAuth
    async session({ session }: { session: Session }) {
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
