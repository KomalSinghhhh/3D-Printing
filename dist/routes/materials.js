"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialsRouter = void 0;
const express_1 = require("express");
const db_1 = require("../database/db");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const cloudinary_1 = require("../database/cloudinary");
const cloudinary_2 = require("../database/cloudinary");
const materialsRouter = (0, express_1.Router)();
exports.materialsRouter = materialsRouter;
materialsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const materials = yield db_1.Material.find({}, "-imageUrl");
    res.json(materials);
}));
materialsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const material = yield db_1.Material.findOne({ productid: id });
    if (material) {
        res.json(material);
    }
    else {
        res.status(404).json({ message: "Material not found" });
    }
}));
materialsRouter.post("/", multer_middleware_1.upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { productid, name, technology, colors, pricePerGram, applicationTypes, } = req.body;
    const imageUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (!imageUrl) {
        res.status(400).json({ message: "Image is required" });
        return;
    }
    const cloudinaryUrl = yield (0, cloudinary_1.uploadImage)(imageUrl);
    if (!cloudinaryUrl) {
        res.status(500).json({ message: "Error uploading image" });
        return;
    }
    const newMaterial = new db_1.Material({
        productid,
        name,
        technology,
        colors: colors.split(","),
        pricePerGram,
        applicationTypes: applicationTypes.split(","),
        imageUrl: cloudinaryUrl,
    });
    try {
        const savedMaterial = yield newMaterial.save();
        if (!savedMaterial) {
            res.status(500).json({ message: "Error saving material" });
        }
        res.json(savedMaterial);
    }
    catch (err) {
        const publicId = (_b = cloudinaryUrl.split("/").pop()) === null || _b === void 0 ? void 0 : _b.split(".")[0];
        if (publicId) {
            yield cloudinary_2.cloudinary.uploader.destroy(publicId);
        }
        res.status(500).json({ message: err });
    }
}));
materialsRouter.put("/:id", multer_middleware_1.upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
    let imageUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    console.log("Yes ");
    console.log(imageUrl);
    if (imageUrl) {
        const oldImageUrl = yield db_1.Material.findOne({ productid: id }, "imageUrl");
        if (oldImageUrl) {
            const publicId = (_b = oldImageUrl.imageUrl.split("/").pop()) === null || _b === void 0 ? void 0 : _b.split(".")[0];
            if (publicId) {
                yield cloudinary_2.cloudinary.uploader.destroy(publicId);
            }
        }
    }
    if (imageUrl) {
        const cloudinaryUrl = yield (0, cloudinary_1.uploadImage)(imageUrl);
        if (!cloudinaryUrl) {
            res.status(500).json({ message: "Error uploading image" });
            return;
        }
        imageUrl = cloudinaryUrl;
    }
    const updatedMaterial = yield db_1.Material.findOneAndUpdate({ productid: id }, {
        name,
        technology,
        colors: colors.split(","),
        pricePerGram,
        applicationTypes: applicationTypes.split(","),
        imageUrl,
    }, { new: true });
    if (updatedMaterial) {
        res.json({
            message: "updated Successfully",
            Updated_Data: updatedMaterial,
        });
    }
    else {
        res.status(404).json({ message: "Material not found" });
    }
}));
materialsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    console.log("Yes " + id);
    const imageUrl = yield db_1.Material.findOne({ productid: id }, "imageUrl");
    console.log(imageUrl);
    if (imageUrl) {
        const publicId = (_a = imageUrl.imageUrl.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        if (publicId) {
            yield cloudinary_2.cloudinary.uploader.destroy(publicId);
        }
    }
    const result = yield db_1.Material.findOneAndDelete({ productid: id });
    console.log("Yes");
    console.log(result);
    if (result) {
        res.status(404).json({ message: "Deleted Successfully" });
    }
    else {
        res.status(404).json({ message: "Material not found" });
    }
}));
