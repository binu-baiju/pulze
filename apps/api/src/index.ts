import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { type } from "os";
const gql = require("graphql-tag");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "binubaiju",
  database: "crud",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// const typeDefs = `#graphql
//   # type Post {
//   #   id: Int
//   #   title: String
//   #   content: String
//   # }
//   # type Book {
//   #   title: String
//   #   content: String
//   # }

//   # type Query {
//   #   Post: [Post]
//   # }
//   # type Mutation {
//   #   createPost(title: String!, author: String!): Post!
//   # }

// `;
const typeDefs = gql`
  type Query {
    greetings: String
    getAllStudents: [Student!]!
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
    create(firstName: String, lastName: String, age: Int): Student

    updateStudent(
      id: Int!
      firstName: String
      lastName: String
      age: Int
    ): Student

    deleteStudent(id: Int!): Student
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
//   Mutation: {
//     createBook: async (_, { title, content }) => {
//       return await prisma.book.create({
//         data: {
//           title,
//           content,
//         },
//       });
//     },
//   },
// };

const resolvers = {
  Query: {
    // greeting: () => "GraphQL is Awesome",
    getAllStudents: async () => {
      try {
        const students = await prisma.student.findMany();
        return students;
      } catch (error) {
        throw new Error("Unable to fetch students.");
      }
    },
  },
  Mutation: {
    create: async (_, args) => {
      const { firstName, lastName, age } = args;
      const newStudent = await prisma.student.create({
        data: {
          firstName,
          lastName,
          age,
        },
      });
      return newStudent;
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

// const server = new ApolloServer(
//   {
//   typeDefs,
//   resolvers,
// });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((url) => {
  console.log(`🚀  Server ready at: ${url}`);
});
