import express from 'express';
const app = express();
import authRoutes from './routes/auth.route.js';
app.use("/api/auth", authRoutes)




app.listen (5000, () => {
    console.log('Server is running on port 5000');
}
);