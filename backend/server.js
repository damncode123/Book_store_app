import express from "express";
import dotenv from "dotenv";
import { BookRoute } from "./routes/book.routes.js";
import mongoose from "mongoose";
import cors from "cors"

dotenv.config({
  path: "./.env",
});
const app = express();

// cors (cross origin resource sharing) is use to connect the frontend from the backend (very important and needed in this).
app.use(cors());
// Middleware for parsing request  body into json required ( hamesa sabse phele likh do).
app.use(express.json());
// baseurl is defined here.
app.use("/bookroute", BookRoute);

const PORT = process.env.PORT;
 
const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
    console.log("Connected to MongoDB yeahhhhhh");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

main();
