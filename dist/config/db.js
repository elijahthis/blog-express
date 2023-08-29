import mongoose from "mongoose";
// Connect to MongoDB
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        const conn = await mongoose.connect(process.env.MONGO_URI, {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map