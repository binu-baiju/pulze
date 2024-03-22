import { Request, Response } from "express";

import { PrismaClient } from "../../../node_modules/.prisma/client";

// import { timeStamp } from "console";

const prisma = new PrismaClient();

export const updateRecipientStatus = async (req: Request, res: Response) => {
  const { userId, videoId, recipientVideoStatus } = req.body;

  try {
    // Find the Recipient entry based on userId and sendVideoId
    const recipient = await prisma.recipient.findUnique({
      where: {
        unique_user_sendVideo_recipient: {
          userId: userId,
          sendVideoId: videoId,
        },
      },
    });

    if (!recipient) {
      // Handle the case where the Recipient entry is not found
      // throw new Error("Recipient not found");
      // console.log("No Recipient Found to update status");
    }
    // console.log("recipient:", recipient);

    // Update the status of the Recipient entry
    if (recipient) {
      if (recipient.status === recipientVideoStatus) {
        // console.log("Recipient status is already", recipientVideoStatus);
        return res.json({
          message: "Recipient status is already set to " + recipientVideoStatus,
          Status: recipient?.status,
        });
      }

      // Check if the current status is "Responded" and the new status is "Opened"
      if (
        recipient.status === "Responded" &&
        recipientVideoStatus === "Opened"
      ) {
        // console.log(
        //   "Recipient status is already 'Responded', cannot update to 'Opened'"
        // );
        return res.json({
          message:
            "Recipient status is already 'Responded', cannot update to 'Opened'",
          Status: recipient?.status,
        });
      }

      let updatedRecipient;
      try {
        updatedRecipient = await prisma.recipient.update({
          where: { id: recipient.id },
          data: { status: recipientVideoStatus },
        });
        // console.log("updated recipient", updatedRecipient);
      } catch (error) {
        console.error("error to update", error);
      }

      // console.log("Recipient status updated successfully");
      res.json({ Status: updatedRecipient?.status });
    }
  } catch (error) {
    console.error("Error updating recipient status:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
};
