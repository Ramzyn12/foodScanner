require("dotenv").config();
const express = require("express");
require('express-async-errors');
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Import routes and middlewares
const authRoutes = require('./routes/authRoutes');
const openFoodFactsRoutes = require('./routes/openFoodFactsRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
const groceryRoutes = require('./routes/groceryRoutes');
const searchSingleRoutes = require('./routes/searchSingleRoutes');
const userRoutes = require('./routes/userRoutes');
const metricRoutes = require('./routes/metricRoutes');
const errorHandler = require("./middleware/errorHandler");
// const authMiddleware = require("./middleware/authMiddleware");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/open-food-facts', openFoodFactsRoutes);
app.use('/api/v1/diary-days', diaryRoutes);
app.use('/api/v1/ivy', searchSingleRoutes);
app.use('/api/v1/groceries', groceryRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/health-metrics', metricRoutes);

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

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
