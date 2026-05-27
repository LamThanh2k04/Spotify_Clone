import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/DB/index.js';
import router from './routers/index.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
connectDB();