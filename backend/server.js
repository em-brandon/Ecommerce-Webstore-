import express from "express";// Importing the express module to create a web server
import dotenv from "dotenv"; // Importing dotenv to manage environment variables
import { connectDB} from "./config/Database.js"; // Importing the connect function to establish a database connection

import productRoutes from "./models/routes/product.route.js"; // Importing product routes to handle product-related API endpoints
 


dotenv.config(); // Loads environment variables from a .env file into process.env
import Product from "./models/product.model.js"; // Importing the Product model to interact with the products collection in the database

const app = express(); // Calls the express function to create an app instance
app.use(express.json()); // Middleware to parse JSON request bodies



// Home route to test the server
app.get('/', (req, res) => { // Defines a route for the root URL
  res.send('Welcome to the homepage!');
});

app.use("/api/products",productRoutes); // Uses the product routes for any requests to /api/products


app.listen (5000, async () => {  // Starts the server and listens on port 5000
  try {
    // Connects to the MongoDB database using the connectDB function
    await // Attempts to connect to the database
    connectDB(); // Calls the connect function to establish a connection to the database
    console.log(process.env.MONGO_URI); // Logs the MongoDB URI from environment variables
    console.log("Database connected successfully");

  } catch (error) {
  console.error("Database connection failed:", error.message); 
  }


    console.log("Server is running on port 5000 http://localhost:5000");

});