require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Import routes and middlewares
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require("./middleware/authMiddleware");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use('/api/v1/auth', authRoutes);

//After auth routes of course! maybe put in seperate files
app.use(authMiddleware)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
