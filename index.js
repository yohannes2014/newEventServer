import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoute from './src/routes/allRoutes.js';

// envaroment variable
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'https://myeventscheduler.netlify.app',
  credentials: true 
}));

// Routes
app.use('/api/', allRoute);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

console.log('Current NODE_ENV:', process.env.NODE_ENV);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
