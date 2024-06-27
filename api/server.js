require("dotenv").config();
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require('../api/utils/logger')
const winston = require("winston");

app.set('trust proxy', 1) // change if doenst work
// app.get('/ip', (request, response) => response.send(request.ip + 's'))

//catching all synchronous errors not caught
process.on("uncaughtException", (err) => {
  console.log("uncaught exception shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const paymentLogger = winston.loggers.get('PaymentLogger')
const orderLogger = winston.loggers.get('OrderLogger')

// paymentLogger.info('Payment recieved')
// orderLogger.error('Order recieved')

// Import routes and middlewares
const authRoutes = require("./routes/authRoutes");
const openFoodFactsRoutes = require("./routes/openFoodFactsRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const searchSingleRoutes = require("./routes/searchSingleRoutes");
const userRoutes = require("./routes/userRoutes");
const metricRoutes = require("./routes/metricRoutes");
const timelineRoutes = require("./routes/timelineRoutes");
const noteRoutes = require("./routes/noteRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const errorHandler = require("./middleware/errorHandler");
const { UnauthorizedError, TooManyRequestsError } = require("./utils/error");
const { default: rateLimit } = require("express-rate-limit");
// const authMiddleware = require("./middleware/authMiddleware");

const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 800, // limit each IP to 1000 requests per windowMs
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests, please try again later",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(globalLimiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/open-food-facts", openFoodFactsRoutes);
app.use("/api/v1/diary-days", diaryRoutes);
app.use("/api/v1/ivy", searchSingleRoutes);
app.use("/api/v1/groceries", groceryRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/health-metrics", metricRoutes);
app.use("/api/v1/timeline-weeks", timelineRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/webhooks", webhookRoutes);

// Error Handlers
app.use("*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
});
app.use(errorHandler);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

console.log(process.env.NODE_ENV);
// Start the server
const PORT = 3000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// catching all asynchronous promise rejection not handled
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
  // Have some tool to restart the server!? many hosting services do this anyway
});

// console.log(x);
