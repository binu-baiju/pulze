import e, { Request, Response } from "express";

import { PrismaClient } from "../../node_modules/.prisma/client";

const prisma = new PrismaClient();

export const createNewWorkspaceContoller = async (req: Request, res: Response) => {
  const { workspace_name, creater_id } = req.body;

  try {
    if (!creater_id) {
      return res.status(400).json({ error: "Creater ID is required" });
    }

    const workspace = await prisma.workspace.create({
        data: {
          name: workspace_name,
          workspace_creator_id: creater_id,
        }
      });
    
    const workspaceMember = await prisma.workspaceMember.create({
          data: {
            user_id: creater_id,
            workspace_id: workspace.workspace_id,
          }
        });

    return res.json({ message: "Workspace Created Successful", workspaceId: workspace.workspace_id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getWorkspaceContoller = async (req: Request, res: Response) => {
    const { workspace_id } = req.query;
  
    try {
      if (!workspace_id) {
        return res.status(400).json({ error: "Workspace ID is required" });
      }
  
      const workspace =await prisma.workspace.findUnique({where:{ workspace_id: String(workspace_id) }});
  
      return res.json({ workspace: workspace });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

export const getAllWorkspaceMemberContoller = async (req: Request, res: Response) => {
    const { workspace_id } = req.query;
  
    try {
      if (!workspace_id) {
        return res.status(400).json({ error: "Creater ID is required" });
      }
  
      const workspaceMember =await prisma.workspaceMember.findMany({where:{ workspace_id: String(workspace_id) }});
  
      return res.json({ workspaceMember: workspaceMember });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

export const getWorkspaceByUserContoller = async (req: Request, res: Response) => {
    const { user_id } = req.query;
  
    try {
      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const workspacesMembers= await prisma.workspaceMember.findMany({
        where: {
          user_id: String(user_id)
        }
      });

      const workspaces:any = [];

      console.log(workspacesMembers);
      for(let i=0; i< workspacesMembers.length ; i++)
      {
        const workspace= await prisma.workspace.findUnique({
          where: {
            workspace_id: String(workspacesMembers[i].workspace_id)
          }
        });

        if(workspace)
        {
          workspaces.push(workspace)
        }
      }
  
      return res.json({ workspaces });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


export const deleteWorkspaceContoller = async (req: Request, res: Response) => {
    const { workspace_id } = req.body;
  
    try {
      if (!workspace_id) {
        return res.status(400).json({ error: "Workspace ID is required" });
      }

      const workspaceMemberDeleted = await prisma.workspaceMember.deleteMany({
        where: {
          workspace_id: workspace_id
        }
      })
  
      const workspacesDeleted= await prisma.workspace.delete({
        where: {
          workspace_id: workspace_id
        }
      });
  
      return res.json({ message: "Workspace Deleted Successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


export const leaveWorkspaceContoller = async (req: Request, res: Response) => {
    const { workspace_id, user_id } = req.body;
  
    try {
      if (!workspace_id) {
        return res.status(400).json({ error: "Workspace ID is required" });
      }

      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const workspace = await prisma.workspace.findUnique({
        where: {
          workspace_id: workspace_id
        }
      });

      const allWorkspaceMember = await prisma.workspaceMember.findMany({
        where: {
          workspace_id: workspace_id
        }
      });

      const workspaceMember = await prisma.workspaceMember.findMany({
        where: {
          workspace_id: workspace_id,
          user_id: user_id
        }
      })
  
      if(!workspace)
      {
        return res.status(400).json({ error: "Workspace doesn't exist" });
      }

      if(allWorkspaceMember.length <1)
      {
        return res.status(400).json({ error: "Can't leave workspace with no members" });
      }

      if(workspace.workspace_creator_id == user_id)
      {
        const workspaceMemberId = allWorkspaceMember[0]
        const updatedRecipient = await prisma.workspace.update({
          where: { workspace_id: workspace_id },
          data: { workspace_creator_id: workspaceMemberId.user_id },
        });

        const workspaceMemberDeleted= await prisma.workspaceMember.deleteMany({
            where :{
              workspace_id: workspace_id,
              user_id: user_id
            }
          });
      }
      else
      {
        const workspaceMemberDeleted= await prisma.workspaceMember.deleteMany({
          where :{
            workspace_id: workspace_id,
            user_id: user_id
          }
        });

      }

      return res.json({ message: "Workspace Left Successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  export const addWorkspaceMemberContoller = async (req: Request, res: Response) => {
    const { workspace_id, user_id } = req.body;
  
    try {
      if (!workspace_id) {
        return res.status(400).json({ error: "Workspace ID is required" });
      }

      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const workspace = await prisma.workspace.findUnique({
        where: {
          workspace_id: workspace_id
        }
      });
  
      if(!workspace)
      {
        return res.status(400).json({ error: "Workspace doesn't exist" });
      }

      const createWorkspace = await prisma.workspaceMember.create({
        data: {
            user_id: user_id,
            workspace_id: workspace_id
        }
      });
      return res.json({ message: "Workspace Member Updated Successful" });
      

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  export const getWorkspaceMemberContoller = async (req: Request, res: Response) => {
    const { workspace_id, user_id } = req.body;
  
    try {
      if (!workspace_id) {
        return res.status(400).json({ error: "Workspace ID is required" });
      }

      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const workspaceMember = await prisma.workspaceMember.findMany({
        where: {
          workspace_id: workspace_id
        }
      });
  
      return res.json({ workspace: workspaceMember });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  export const removeWorkspaceMemberContoller = async (req: Request, res: Response) => {
    const { workspace_id, user_id } = req.body;
  
    try {
      if (!workspace_id) {
        return res.status(400).json({ error: "Workspace ID is required" });
      }

      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const workspaceMember = await prisma.workspaceMember.deleteMany({
        where: {
          workspace_id: String(workspace_id),
          user_id: String(user_id)
        }
      });
  
      return res.json({ message: "Workspace Member Deleted Successful" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };