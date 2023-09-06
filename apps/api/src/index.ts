import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import gql from "graphql-tag";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    students: [Student!]!
  }
  # Student object
  type Student {
    id: ID
    firstName: String
    lastName: String
    age: Int
  }

  # Mutation
  type Mutation {
    createStudent(firstName: String, lastName: String, age: Int): Student

    updateStudent(
      id: Int!
      firstName: String
      lastName: String
      age: Int
    ): Student

    deleteStudent(id: Int!): Student
  }
`;

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
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
