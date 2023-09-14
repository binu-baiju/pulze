import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import gql from "graphql-tag";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "./node_modules/.prisma/client";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { error } from "console";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    students: [Student!]!
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
  }

  type Mutation {
    signup(email: String!, password: String!): UserWithToken!
    login(email: String!, password: String!): UserWithToken!
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
  },
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
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
