import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
export const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB Disconnected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}