import mongoose from "mongoose"; // Imports mongoose for MongoDB object modeling


const productSchema = new mongoose.Schema({ // Defines the schema for the Product model
    name: { 
        type: String,
        required: true 
    },
    
    price : { 
        type: Number, 
        required: true

    },
 
    image:  {
        type : String,
        required: true
    },
    
}, { timestamps: true } );
// Adds createdAt and updatedAt timestamps

const Product = mongoose.model("Product", productSchema); // Creates the Product model from the schema
export default Product; // Exports the Product model for use in other files

