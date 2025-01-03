const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection");

const app = express();

async function startApolloServer() {
  await connectDB();

  // Apply middleware
  //   app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });

  // Start server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

// Handle errors
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  process.exit(1);
});

startApolloServer().catch((error) => {
  console.error("Failed to start server:", error);
});
