import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
cors(app);

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("Hello from server")
})

connectDB()

app.listen(PORT, () =>{
    console.log("Server is running on port ", PORT);
})



