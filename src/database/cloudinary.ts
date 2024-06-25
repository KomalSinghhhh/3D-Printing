import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (path: string) => {
  try {
    if (!path) return;
    const uploadedImage = await cloudinary.uploader.upload(path, {
      resource_type: "image",
    });
    fs.unlinkSync(path);
    return uploadedImage.url;
  } catch (err) {
    fs.unlinkSync(path);
    console.error(err);
    return null;
  }
};

export { uploadImage, cloudinary };
