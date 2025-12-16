const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./src/models");
const routes = require("./src/routes");
const errorHandler = require("./src/middleware/errorHandler");
const { apiReference } = require("@scalar/express-api-reference");

// Load OpenAPI specification
const openApiSpec = require("./src/openapi.json");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Update OpenAPI server URL dynamically
openApiSpec.servers = [
  {
    url: `http://localhost:${PORT}`,
    description: "Development server",
  },
];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "La Grande Soirée Gnawa API",
    timestamp: new Date(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes
app.use("/api", routes);

// Serve OpenAPI spec as JSON endpoint
app.get("/openapi.json", (req, res) => {
  res.json(openApiSpec);
});

// Scalar API Documentation
app.use(
  "/docs",
  apiReference({
    theme: "purple",
    spec: {
      url: "/openapi.json",
    },
  })
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");

    // Sync models (alter: true updates schema without dropping data)
    await sequelize.sync({ alter: true });
    console.log("✅ Database models synchronized");

    // Start server
    app.listen(PORT, () => {
      console.log("\n🚀 Server is running!");
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/docs`);
      console.log(`📄 OpenAPI Spec: http://localhost:${PORT}/openapi.json\n`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error.message);
    console.error(error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Start the server
startServer();
