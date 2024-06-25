import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDbUrl: string = process.env.MONGODB_URL || "";

mongoose.connect(MongoDbUrl);

const materialSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  pricePerGram: {
    type: Number,
    required: true,
    min: 0,
  },
  applicationTypes: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Material = mongoose.model("Material", materialSchema);

export { Material };
