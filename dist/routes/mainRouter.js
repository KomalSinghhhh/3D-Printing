"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const materials_1 = require("./materials");
const mainRouter = express_1.default.Router();
exports.mainRouter = mainRouter;
mainRouter.use("/material", materials_1.materialsRouter);
