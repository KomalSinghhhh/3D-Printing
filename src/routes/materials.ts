import { Router, Request, Response } from "express";
import { Material } from "../database/db";
import { upload } from "../middlewares/multer.middleware";
import { uploadImage } from "../database/cloudinary";
import { cloudinary } from "../database/cloudinary";

const materialsRouter = Router();

materialsRouter.get("/", async (req: Request, res: Response) => {
  const materials = await Material.find({}, "-imageUrl");
  res.json(materials);
});

materialsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const material = await Material.findOne({ productid: id });
  if (material) {
    res.json(material);
  } else {
    res.status(404).json({ message: "Material not found" });
  }
});

materialsRouter.post("/", upload.single("image"), async (req, res) => {
  const {
    productid,
    name,
    technology,
    colors,
    pricePerGram,
    applicationTypes,
  } = req.body;
  const imageUrl = req.file?.path;
  if (!imageUrl) {
    res.status(400).json({ message: "Image is required" });
    return;
  }
  const cloudinaryUrl = await uploadImage(imageUrl);
  if (!cloudinaryUrl) {
    res.status(500).json({ message: "Error uploading image" });
    return;
  }
  const newMaterial = new Material({
    productid,
    name,
    technology,
    colors: colors.split(","),
    pricePerGram,
    applicationTypes: applicationTypes.split(","),
    imageUrl: cloudinaryUrl,
  });
  try {
    const savedMaterial = await newMaterial.save();
    if (!savedMaterial) {
      res.status(500).json({ message: "Error saving material" });
    }
    res.json(savedMaterial);
  } catch (err) {
    const publicId = cloudinaryUrl.split("/").pop()?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    res.status(500).json({ message: err });
  }
});

materialsRouter.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, technology, colors, pricePerGram, applicationTypes } =
      req.body;
    let imageUrl = req.file?.path;
    console.log("Yes ");
    console.log(imageUrl);
    if (imageUrl) {
      const oldImageUrl = await Material.findOne({ productid: id }, "imageUrl");
      if (oldImageUrl) {
        const publicId = oldImageUrl.imageUrl.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }

    if (imageUrl) {
      const cloudinaryUrl = await uploadImage(imageUrl);
      if (!cloudinaryUrl) {
        res.status(500).json({ message: "Error uploading image" });
        return;
      }
      imageUrl = cloudinaryUrl;
    }

    const updatedMaterial = await Material.findOneAndUpdate(
      { productid: id },
      {
        name,
        technology,
        colors: colors.split(","),
        pricePerGram,
        applicationTypes: applicationTypes.split(","),
        imageUrl,
      },
      { new: true }
    );

    if (updatedMaterial) {
      res.json({
        message: "updated Successfully",
        Updated_Data: updatedMaterial,
      });
    } else {
      res.status(404).json({ message: "Material not found" });
    }
  }
);

materialsRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Yes " + id);
  const imageUrl = await Material.findOne({ productid: id }, "imageUrl");
  console.log(imageUrl);
  if (imageUrl) {
    const publicId = imageUrl.imageUrl.split("/").pop()?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }
  const result = await Material.findOneAndDelete({ productid: id });
  console.log("Yes");
  console.log(result);
  if (result) {
    res.status(404).json({ message: "Deleted Successfully" });
  } else {
    res.status(404).json({ message: "Material not found" });
  }
});

export { materialsRouter };
