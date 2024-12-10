const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Built-in body parser
app.use(express.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require("./routes/userRoutes");

// Static folder for uploads
app.use("/uploads", express.static("uploads"));

// Routes Middleware
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Something went wrong!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
