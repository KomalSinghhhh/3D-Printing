"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MongoDbUrl = process.env.MONGODB_URL || "";
mongoose_1.default.connect(MongoDbUrl);
const materialSchema = new mongoose_1.default.Schema({
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
const Material = mongoose_1.default.model("Material", materialSchema);
exports.Material = Material;
