const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");
const connectDB = require("./database/connection");

const typeDefs = loadFilesSync(path.join(__dirname, "schema/typeDefs"));
const resolvers = loadFilesSync(path.join(__dirname, "schema/resolvers"));

async function startServer() {
  const app = express();
  await connectDB();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

startServer();
