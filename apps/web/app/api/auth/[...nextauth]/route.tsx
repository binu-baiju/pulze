// import { AuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "../../../lib/prisma";
// import bcrypt from "bcrypt";

// export const authOptions: AuthOptions = {
//   secret: process.env.SECRET_KEY,
//   session: {
//     strategy: "jwt",
//   },
//   debug: process.env.NODE_ENV === "development",
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//         // username: { label: "Username", type: "text", placeholder: "John Smith" },
//       },
//       async authorize(credentials) {
//         // check to see if email and password is there
//         if (!credentials?.email || !credentials.password) {
//           throw new Error("Please enter an email and password");
//         }

//         // check to see if user exists
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         // if no user was found
//         if (!user || !user?.password) {
//           throw new Error("No user found");
//         }

//         // check to see if password matches
//         const passwordMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         // if password does not match
//         if (!passwordMatch) {
//           throw new Error("Incorrect password");
//         }

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account, profile, isNewUser }) {
//       if (isNewUser) {
//         const workspace = await createWorkspaceForUser(user);
//         token.workspace = workspace.id; // Store workspace id in the token
//       }
//       return { ...token, ...user };
//     },
//     async session({ session, token }) {
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// async function createWorkspaceForUser(user) {
//   // Implement your logic to create a workspace for the user
//   // ...

//   // Example: Creating a workspace using Prisma

//   let workspace;
//   try {
//     workspace = await prisma.workspace.create({
//       data: {
//         name: user.name,
//         workspace_creator_id: user.id,
//       },
//     });

//     // Create WorkspaceMember and connect to the created Workspace
//     const workspaceMember = await prisma.workspaceMember.create({
//       data: {
//         user_id: user.id,
//         workspace_id: workspace.workspace_id,
//       },
//     });
//     console.log(workspace);
//   } catch (error) {
//     console.error("Error creating workspace:", error);
//   }

//   return workspace;
// }
import { AuthOptions, DefaultSession, User } from "next-auth";
import NextAuth from "next-auth/next";
import prisma from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
// type User = {
//   id: string;
//   name: string;
//   email: string;
//   // password: string | null;
// };

// interface Session {
//   session: {
//     // Add the 'id' property to the session
//     id: string;
//     name: string;
//     email: string;
//   };

//   user: {
//     id: string;
//     name: string;
//     email: string;
//     password: string | null;
//     phonenumber: string | null;
//     emailVerified: Date | null;
//     image: string | null;

//     // userId: string; // Add this line
//   };
// }
// interface Session {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     password: string | null;
//     phonenumber: string | null;
//     emailVerified: Date | null;
//     image: string | null;
//   };
// }
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
  }

  interface Session extends DefaultSession {
    user: User;
    expires: string;
    error: string;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        phonenumber: {
          label: "Phonenumber",
          type: "number",
          placeholder: "John Smith",
        },
      },
      async authorize(
        credentials:
          | Record<"email" | "password" | "phonenumber", string>
          | undefined
      ): Promise<User | null> {
        console.log("entered nextAuth");
        if (!credentials) {
          throw new Error("Credentials are missing");
        }
        // check to see if email and password is there
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }
        console.log("email:", credentials.email);

        // // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log("user from nextauth", user);

        if (!user) {
          throw new Error("No user found");
        }
        // if no user was found
        if (!user || !user?.password) {
          throw new Error("No user found");
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        // const user = {
        //   id: "1",
        //   name: "Brett",
        //   email: "brett@gmail.com",
        //   password: "123456",
        // };
        // const session: Session = {
        //   user: {
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     password: user.password,
        //     phonenumber: user.phonenumber,
        //     emailVerified: user.emailVerified,
        //     image: user.image,
        //   },
        // };

        console.log("user from nextauth", user);

        return user;
        // Add other fields as needed
      },
    }),
  ],

  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
    // jwt: true,
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user, session }) {
      // the processing of JWT occurs before handling sessions.
      console.log("jwt callback ", { token, user, session });

      if (user) {
        // token.accessToken = user.accessToken;
        // token.refreshToken = user.refreshToken;
        // token.accessTokenExpires = user.accessTokenExpires;
        // token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.id = user.id;
      }

      return token;
    },

    //  The session receives the token from JWT
    async session({ session, token, user }) {
      console.log("session callback ", { token, user, session });

      return {
        ...session,
        user: {
          ...session.user,
          // accessToken: token.accessToken as string,
          // refreshToken: token.refreshToken as string,
          // role: token.role,
          id: token.id,
        },
        error: token.error,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
