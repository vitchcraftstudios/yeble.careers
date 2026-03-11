import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

const adminEmail = process.env.ADMIN_EMAIL || "admin@yeble.careers";
const adminPassword = process.env.ADMIN_PASSWORD || "changeme";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // simple admin env-based login
        if (
          credentials.email.toLowerCase() === adminEmail.toLowerCase() &&
          credentials.password === adminPassword
        ) {
          return {
            id: "admin-env",
            email: adminEmail,
            name: "Admin",
            role: "ADMIN",
          } as any;
        }

        // fallback: check Prisma user with password hash if available
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });
        if (!user || !user.password) return null;

        const match = await compare(credentials.password, user.password);
        if (!match) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
