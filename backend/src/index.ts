import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import userRoutes from "./routes/users.route";
import authRotues from "./routes/auth.route";
import myHotelRoute from "./routes/my-hotels.route";
import hotelRoute from "./routes/hotels.route";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING_LOCAL as string);

const app = express();
const port = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRotues);
app.use("/api/my-hotels", myHotelRoute);
app.use("/api/hotels", hotelRoute);

app.listen(port, () => {
  console.log(`server running on localhost ${port}`);
});
