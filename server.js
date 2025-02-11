require('dotenv').config();
const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));
mongoose.connect(process.env.MONGO_URI) // Ensure MONGO_URI is correctly set in .env
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
  
// Home Route
app.get('/', (req, res) => {
  res.send("Welcome to the E-commerce API");
});

// Payment Routes
const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
