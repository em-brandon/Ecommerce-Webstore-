import express from "express";// Importing the express module to create a web server
import dotenv from "dotenv"; // Importing dotenv to manage environment variables
import { connectDB} from "./config/Database.js"; // Importing the connect function to establish a database connection

dotenv.config(); // Loads environment variables from a .env file into process.env
import Product from "./models/product.model.js"; // Importing the Product model to interact with the products collection in the database

const app = express(); // Calls the express function to create an app instance
app.use(express.json()); // Middleware to parse JSON request bodies



// Home route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get ("/api/products", async (req, res) => { // Route to fetch all products from the database
  try {
    const products = await Product.find(); // Fetches all products from the database
    res.status(200).json({ success: true, products }); // Responds with a success message and the list of products
  } catch (error) {
    console.log("Error fetching products:")
    res.status(500).json({ success: false, message: "Internal server error" }); // Handles any errors that occur during the fetch operation
  }
});

app.post ("/api/products", async (req, res) => {
const product = req.body; // Extracts the product data from the request body from the user interface 


if (! product.name || !product.price || !product.image) {
  return res.status(400).json({ success: false, message: "Please fill all the fields" }); // Checks if all required fields are present

}

const newProduct = new Product(product); // Creates a new instance of the Product model with the provided data

try {
    await newProduct.save(); // Saves the new product to the database
    res.status(201).json({ success: true, message: "Product created successfully", product: newProduct }); // Responds with a success message and the created product
    
    
} catch (error) { 
  console.error ("Error creating product:", error.message );
  res.status (500).json({ success: false, message: "Internal server error" }); // Handles any errors that occur during the save operation
  // 
}
});

app.delete("/api/products/:id", async (req, res) => {
const {id } = req.params; // Extracts the product ID from the request parameters
  

try {
await Product.findByIdAndDelete(id); // Attempts to find and delete the product by its ID
res.status(200).json({ success: true, message: "Product deleted successfully" }); // Responds with a success message if deletion is successful



} catch (error) {
res.status(500).json({ success: false, message: "Internal server error" }); // Handles any errors that occur during the deletion process
}
});


app.put ("/api/products/:id", async (req,res) => {
  const { id  } = req.params; // Extracts the product ID from the request parameters
  const product = req.body; // Extracts the updated product data from the request body 


   const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
  }catch (error) {
    console.error("Error updating product:", error.message); // Logs any errors that occur during the update process
    return res.status(500).json({ success: false, message: "Internal server error" }); // Responds with an error message if the update fails
  }
  res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct }); // Responds with a success message and the updated product

}catch (error) {
  res.status(500).json({ success: false, message: "Internal server error" }); // Handles any errors that occur during the update process
  console.error("Error updating product:", error.message); // Logs any errors that occur during the update process
});

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