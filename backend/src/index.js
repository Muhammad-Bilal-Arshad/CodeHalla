import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express();
app.use(express.json())
app.use(cookieParser())
import authRoutes from './routes/auth.route.js';
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000;


app.listen (PORT, () => {
    console.log('Server is running on port:', PORT);
    connectDB() 
}
);