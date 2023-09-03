import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const app = express();
const port = 4000;

// In-memory data store
const data = {
  students: [
    { id: "001", name: "Jaime" },
    { id: "002", name: "Jorah" },
  ],
};

// Schema
const typeDefs = `
type Student {
  id: ID!
  name: String!
}

type Query {
  students: [Student]
}
`;

// Resolver for warriors
const resolvers = {
  Query: {
    students: (obj, args, context) => data.students,
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Entrypoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`);
});
