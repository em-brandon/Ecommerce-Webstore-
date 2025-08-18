import express from "express";// Importing the express module to create a web server
import dotenv from "dotenv"; // Importing dotenv to manage environment variables
import { connectDB} from "./config/Database.js"; // Importing the connect function to establish a database connection
dotenv.config(); // Loads environment variables from a .env file into process.env

const app = express(); // Calls the express function to create an app instance

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get("/products", (req, res) => {}); // Defines a route for GET requests to "/products"

console.log(process.env.MONGO_URI); // Logs the MongoDB URI from environment variables


app.listen (5000, () => {  // Starts the server and listens on port 5000
  connectDB() // Calls the connect function to establish a connection to the database
    console.log("Server is running on port 5000 http://localhost:5000");

});