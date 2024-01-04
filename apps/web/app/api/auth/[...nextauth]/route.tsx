import { AuthOptions } from 'next-auth';
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/prisma';

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
      },
    adapter: PrismaAdapter(prisma),
    providers: [
GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET!
})
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
          if (isNewUser){
            const workspace = await createWorkspaceForUser(user);
            token.workspace = workspace.id; // Store workspace id in the token
          }
          return { ...token, ...user };
        },
        async session({ session, token }) {
          return session;
        },
      },
  
}

const handler = NextAuth(authOptions)

export{ handler as GET, handler as POST };

async function createWorkspaceForUser(user) {
  // Implement your logic to create a workspace for the user
  // ...

  // Example: Creating a workspace using Prisma

    
  let workspace;
  try {
    workspace = await prisma.workspace.create({
      data: {
        name: user.name,
        workspace_creator_id: user.id,
      }
    });

    // Create WorkspaceMember and connect to the created Workspace
    const workspaceMember = await prisma.workspaceMember.create({
      data: {
        user_id: user.id,
        workspace_id: workspace.workspace_id,
      }
    });
  console.log(workspace);

    
  } catch (error) {
    console.error("Error creating workspace:", error);
    
  }

  return workspace;
}
