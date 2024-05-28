import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs"

import prisma from "@/app/libs/prismadb"

export const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials: {
                email: {label:"email", type:"text"},
                password: {label:"password", type:"password"}
            },
           async authorize(credentials){
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Invalid credentials");
              }
      
              const user = await prisma.user.findUnique({
                where: {
                  email: credentials.email,
                },
              });
      
              if (!user) {
                throw new Error("Invalid credentials");
              }
      
              const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.passwordHash
              );
      
              if (!isCorrectPassword) {
                throw new Error("Invalid credentials");
              }
      
              return user;
           }
        })
    ],
    session : {
      strategy : "jwt",
    },
    secret : process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};


