// Importing necessary modules
import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from "cors";

// Importing todo routes
import todoRoutes from './routes/Routes.js';

const app = express();
app.use(express.json());

app.use(cors());
app.use('/api', todoRoutes);

// MongoDB Connection using mongoose
mongoose.connect(process.env.MongoDB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log('Database Connected'));

// Starting server, logging a msg with port
const Port = process.env.Port;
    app.listen(Port, () => console.log(`Server running on port ${Port}`));
