import mongoose from "mongoose"; // Imports mongoose for MongoDB object modeling

const classSchema = new mongoose.Schema({ // Defines the schema for the Class model

    studentName: {
        type: String,
        required: true,
    },
},
    
 { timestamps: true } );
// Adds createdAt and updatedAt timestamps


const Class = mongoose.model("Class", classSchema); // Creates the Class model from the schema
export default Class; // Exports the Class model for use in other files