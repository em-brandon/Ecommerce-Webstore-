import express from express;// Importing the Express framework
import Product from "../product.model.js"; // Importing the Product model to interact with the products collection in the database


const router = express.Router(); // Creating a new router instance
export default router; // Exporting the router to be used in other parts of the routerlication


router.get ("/", async (req, res) => { // Routerto fetch all products from the database
  try {
    const products = await Product.find(); // Fetches all products from the database
    res.status(200).json({ success: true, products }); // Responds with a success message and the list of products
  } catch (error) {
    console.log("Error fetching products:")
    res.status(500).json({ success: false, message: "Internal server error" }); // Handles any errors that occur during the fetch operation
  }
});

router.post ("/", async (req, res) => { 
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

router.delete("/:id", async (req, res) => {
const {id } = req.params; // Extracts the product ID from the request parameters
  

try {
await Product.findByIdAndDelete(id); // Attempts to find and delete the product by its ID
res.status(200).json({ success: true, message: "Product deleted successfully" }); // Responds with a success message if deletion is successful


} catch (error) {
res.status(500).json({ success: false, message: "Internal server error" }); // Handles any errors that occur during the deletion process
}
});

router.put("/:id", async (req, res) => {
  const { id } = req.params; // Extracts the product ID from the request parameters

  const product = req.body; // Extracts the updated product data from the request body

  try {

     if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({ success: false, message: "Product not found" }); // Checks if the provided ID is a valid MongoDB ObjectId

   const updatedProduct = await Product.findByIdAndUpdate (id, product, { new: true }) // Attempts to find and update the product by its ID with the new data
  res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct }); // Responds with a success message and the updated product
    
  if (!updatedProduct){

    return res.status(404).json({ success: false, message: "Product not found" }); // Handles the case where the product is not found
  }

 }

  } catch (error) {
    res.status(500).json({ success: false, message: "Product not found" }); // Handles the case where the product is not found
  }
});
