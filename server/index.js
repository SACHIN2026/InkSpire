import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
connectDB()
const app = express();
const PORT = process.env.PORT || 5000;
cors(app);

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) =>{
    res.send("Hello from server")
})


app.listen(PORT, () =>{
    console.log("Server is running on port ", PORT);
})



