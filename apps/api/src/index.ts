// import { ApolloServer } from "@apollo/server";
import { ApolloError, ApolloServer } from "apollo-server-express";

import { startStandaloneServer } from "@apollo/server/standalone";

import gql from "graphql-tag";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "./node_modules/.prisma/client";

import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { error } from "console";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload-ts";
// const { graphqlUploadExpress, GraphQLUpload } = require("graphql-upload-ts");

// import { GraphQLUpload} from 'graphql-upload'
// const { GraphQLUpload } = require("graphql-upload");
// const { graphqlUploadExpress } = require("graphql-upload");
// import { graphqlUploadExpress } from "graphql-upload";
import cors from "cors";
// const cors = require("cors");

const app = express();

import { createUploadStream } from "./modules/stream";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    students: [Student!]!
    hello: String!
  }
  # Student object
  type Student {
    id: Int
    firstName: String
    lastName: String
    age: Int
  }

  # Mutation
  type Mutation {
    createStudent(firstName: String, lastName: String, age: Int): Student

    updateStudent(
      id: Int!
      firstName: String # lastName: String
    ): # age: Int
    Student

    deleteStudent(id: Int!): Student
  }

  type User {
    id: String!
    email: String!
  }

  type UserWithToken {
    user: User!
    token: String!
  }

  type Query {
    users: [User!]!
    otherFields: Boolean!
  }

  scalar Upload

  type FileUploadResponse {
    ETag: String!
    Location: String!
    key: String!
    Key: String!
    Bucket: String!
  }

  # input FileInput {
  #   file: String!
  #   # title: String!
  #   # description: String!
  # }

  type Mutation {
    signup(email: String!, password: String!): UserWithToken!
    login(email: String!, password: String!): UserWithToken!
    uploadVideo(file: Upload!): FileUploadResponse!
    sendMessage1(message: String!): Boolean!
    uploadTextFile(file: Upload!): Boolean
  }
`;

const secretKey = process.env.SECRET_KEY;
const resolvers = {
  Query: {
    students: async () => {
      try {
        const students = await prisma.student.findMany();
        return students;
      } catch (error) {
        throw new Error("Unable to fetch students.");
      }
    },
    hello: () => "Hello from the backend!",
  },
  Upload: GraphQLUpload,
  Mutation: {
    createStudent: async (_, args) => {
      const { firstName, lastName, age } = args;

      try {
        const newStudent = await prisma.student.create({
          data: {
            firstName,
            lastName,
            age,
          },
        });
        return newStudent;
      } catch (error) {
        console.log(error);
      }
    },

    updateStudent: async (_, { id, firstName, lastName, age }) => {
      try {
        const updatedStudent = await prisma.student.update({
          where: { id },
          data: {
            firstName,
            lastName,
            age,
          },
        });
        return updatedStudent;
      } catch (error) {
        console.error("Prisma Error:", error);
        throw new Error("Unable to update student.");
      }
    },

    deleteStudent: async (_, { id }) => {
      try {
        // Use Prisma to delete the student by ID
        const deletedStudent = await prisma.student.delete({
          where: { id },
        });
        return deletedStudent;
      } catch (error) {
        throw new Error(`Unable to delete student with ID ${id}`);
      }
    },
    signup: async (_, { email, password }) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          throw new Error("User with this email already exists.");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
          data: {
            id: uuidv4(),
            email,
            passwordHash,
          },
        });

        const token = jwt.sign({ userId: newUser.id }, secretKey, {
          expiresIn: "1h", // Token expiration time (adjust as needed)
        });

        // return newUser;
        return { user: newUser, token };
      } catch (error) {
        throw new Error(`Error during signup: ${error.message}`);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }
        const passwordValid = await bcrypt.compare(password, user.passwordHash);

        if (!passwordValid) {
          throw new Error("Invalid password");
        }
        const token = jwt.sign({ userId: user.id }, secretKey, {
          expiresIn: "1h", // Token expiration time (adjust as needed)
        });

        return { user, token };
      } catch (error) {
        throw new Error(`Error during login: ${error.message}`);
      }
    },
    // uploadVideo: async (parent, { file }) => {

    uploadVideo: async (parent, { file }) => {
      // console.log("hello from upload");
      // const { filename, createReadStream } = await file;

      // const stream = createReadStream();

      // let result: any;

      // try {
      //   console.log(filename);
      //   const uploadStream = createUploadStream(filename);
      //   console.log("1");
      //    // Replace with your upload logic
      //   stream.pipe(uploadStream.writeStream);
      //   console.log("2");

      //   result = await uploadStream.promise;
      //   console.log("3");

      // } catch (error) {
      //   console.log(error);
      //   console.error(
      //     `[Error]: Message: ${error.message}, Stack: ${error.stack}`
      //   );
      //   throw new ApolloError("Error uploading file");
      // }

      // return result;
      const { filename, createReadStream } = await file;

      const stream = createReadStream();

      let result;

      try {
        console.log("hello");
        
        const uploadStream = createUploadStream(filename);
        stream.pipe(uploadStream.writeStream);
        result = await uploadStream.promise;
      } catch (error) {
        console.log(
          `[Error]: Message: ${error.message}, Stack: ${error.stack}`
        );
        throw new ApolloError("Error uploading file");
      }

      return result;

    },
    sendMessage1: async (_, { message }) => {
      try {
        // Handle your string processing logic here
        console.log('Received message from frontend:', message);

        // Perform any additional actions with the message as needed

        return true; // Indicate success
      } catch (error) {
        console.error(`Error sending message: ${error.message}`);
        return false; // Indicate failure
      }
    },
    uploadTextFile: async (_, { file }) => {
      // try {
      //   const { createReadStream } = await file;
      //   const stream = createReadStream();

      //   // Process the stream to extract and handle the text content
      //   // In this example, we'll convert the text to uppercase
      //   let textContent = '';
      //   for await (const chunk of stream) {
      //     textContent += chunk.toString();
      //   }

      //   // Handle the text content as needed (e.g., save to database, process, etc.)
      //   // For now, we'll just return the uppercase text
      //   return textContent.toUpperCase();
      // } catch (error) {
      //   console.error('Error uploading text file:', error);
      //   throw new Error('Error uploading text file');
      // }
      try {
        // Handle the text file here (e.g., save it to disk or process it)
        // You may need to adapt this part based on your specific use case

        console.log("Received text file:", file);

        // Return true to indicate a successful upload
        return true;
      } catch (error) {
        console.error("Error uploading text file:", error);
        // Return false to indicate a failed upload
        return false;
      }
    },


  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers  });
  await server.start();

  const allowedOrigins = [
    'http://localhost:5173', // Replace with the URL of your first frontend
    'http://localhost:3000', // Replace with the URL of your second frontend
  ];
 
  app.use(graphqlUploadExpress());
  (server as any).applyMiddleware({ app: app });
  app.use(
    cors(
    //   {origin: allowedOrigins,
    //   // origin: [
    //   //   "http://localhost:5173/", // Replace with the URL of your first frontend
    //   //   "http://localhost:3000/", // Replace with the URL of your second frontend
    //   // ],
    //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   credentials: true, // Enable credentials (if needed)
    // }
    )
  );
  
 
  // startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // }).then(({ url }) => {
  //   console.log(`🚀  Server ready at: ${url}`);
  // });

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()
  .then(() => {
    console.log("Apollo Server started.");
  })
  .catch((error) => {
    console.error("Error starting Apollo Server:", error);
  });
