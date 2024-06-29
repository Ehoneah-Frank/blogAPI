import express from 'express';
import mongoose from "mongoose";
import 'dotenv/config';
import { dbConnection } from './config/db.js';
import authRouter from './controllers/auth.js';

// Connect to database
await mongoose.connect(process.env.MONGO_URL);


dbConnection()

// create Express App
const app = express();

//Apply middlewares
app.use(express.json());

// routes
app.use('/auth', authRouter);


// Listen for incoming requests
app.listen(3000, () =>{
    console.log('App listening on port 3000')
});