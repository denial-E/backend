import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './Database/DBconfig.js';
import userrouter from"./Routers/user.router.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connectDB();

app.get("/", (req, res) => {
  res.status(200).send("App is Working fine");
});
app.use('/api/user',userrouter)
app.listen(port, () => {
  console.log("http://localhost:", port);
});