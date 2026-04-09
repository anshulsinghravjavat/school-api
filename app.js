const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const schoolRoutes = require("./routes/schoolRoutes");

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
    res.send("School API Running 🚀");
});

// API Routes
app.use("/api", schoolRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});