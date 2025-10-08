
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import User from "@/models/User";
import { connectDB } from "./dbConnect";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
    GitHub,
    Google
  ],

  callbacks: {
    async signIn({ user }: { user: any }) {
        
      // Persist user to our DB on first sign-in
      await connectDB();
      // Upsert user by email 
      await User.findOneAndUpdate(
        { email: user.email },
        { name: user.name, image: user.image },
        { upsert: true }
      );
      return true;
    },
    async session({ session }: { session: any }) {
      return session;
    },

  },
  secret: process.env.AUTH_SECRET
})