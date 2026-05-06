import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from '@/lib/types';
import db from "@/../db/index";
import { usersTable } from "@/../db/schemaSqlite";
import { or, eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";


export const authConfig = {
  session: {
    //strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 Day
  },
  providers: [],
  pages: {
    // signIn: '/login',
  },
}

export const authOptions = {
  ...authConfig,
  callbacks: {
    jwt({token, user }: {token: any; user?: any}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { token: any; session?: any }) {
      session.user.id = token.id as string;
      session.strategy = 'jwt';
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log(url, baseUrl);
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/note`;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const { username, password } = credentials as { username?: string; password?: string };

        if (!username || !password) {
          return null;
        }
        let dbUsers: User[] = [];
        try {
          dbUsers = await db.selectDistinct()
            .from(usersTable)
            .orderBy(usersTable.id)
            .where(
              or(
                eq(usersTable.username, username),
                eq(usersTable.email, username)
              ));

          if (!dbUsers || !dbUsers.length) {
            return null;
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          return null;
        }

        const dbUser: User | undefined = dbUsers[0];

        const isValid = await compare(
          password as string,
          dbUser.password
        );

        if (!isValid) {
          return null;
        }

        if (dbUser) {
          // Any object returned will be saved in `user` property of the JWT
          // Convert numeric id to string to match NextAuth's User type
          return {
            ...dbUser,
            id: dbUser.id.toString()
          };
        } else {
          return null;
        }
      }
    })
  ],
}

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
