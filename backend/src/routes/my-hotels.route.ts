import { Request, Response, Router } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model";
import { HotelType } from "../shared/types";
import verifyToken from "./../middleware/auth.middleware";

// Initializing a new router.
const router = Router();

// Setting up multer for file uploads with memory storage and a file size limit of 5MB.
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  verifyToken, // Middleware to verify the token.
  upload.array("imageFiles", 6), // Middleware to handle file uploads.
  async (req: Request, res: Response) => {
    try {
      // Extracting the uploaded files and the new hotel data from the request.
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // Uploading each image to Cloudinary and getting the URLs.
      const imageUrls = await uploadImages(imageFiles);

      // Adding the image URLs, the last updated date, and the user ID to the new hotel data.
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // Creating a new hotel with the new hotel data and saving it to the database.
      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error creating hotel", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).send(hotels);
  } catch (error) {
    res.status(500).send("Error while fetching hotels backend");
  }
});

router.get("/:hotelId", verifyToken, async (req: Request, res: Response) => {
  let hotelID = req.params.hotelId;
  try {
    const hotel = await Hotel.findOne({ _id: hotelID, userId: req.userId });
    res.status(200).send(hotel);
  } catch (error) {}
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);
      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    // Each image file is converted into a format called base64. This is a common way to encode binary data, like images, into text.
    const b64 = Buffer.from(image.buffer).toString("base64");

    // A data URI is a string that represents the image data. It includes the image's MIME type (a standard that indicates the nature and format of a document or a file), followed by the base64-encoded image data.
    let dataURI = "data:" + image.mimetype + ";base64," + b64;

    // The data URI is then uploaded to Cloudinary. Cloudinary is a cloud-based service that provides an end-to-end image and video management solution including uploads, storage, manipulations, optimizations and delivery.
    // The 'await' keyword is used to wait for the upload to finish before moving on. This is necessary because uploading an image can take some time, and we don't want to proceed until we know the upload was successful.
    const res = await cloudinary.v2.uploader.upload(dataURI);

    // Once the upload is complete, Cloudinary provides us with a URL where the image can be accessed. We return this URL so it can be used later.
    return res.url;
  });

  // Waiting for all the images to be uploaded.
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
