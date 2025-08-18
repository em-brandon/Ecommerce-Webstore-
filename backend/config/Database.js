import mongoose from "mongoose"; // Import mongoose for MongoDB interactions

export const connectDB = async () => { // Function to connect to the MongoDB database
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Connects to MongoDB using the URI from environment variables
        console.log(`MongoDB Connected: ${conn.connection.host}`); // Logs the host of the connected MongoDB instance
    } catch (error) {
        console.error(`Error: ${error.message}`); // Logs any error that occurs during the connection
        process.exit(1); // Exits the process with a failure code

    }

};


export default connectDB; // Exports the connectDB function for use in other files