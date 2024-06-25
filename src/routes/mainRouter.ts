import express from "express";
import { materialsRouter } from "./materials";

const mainRouter = express.Router();

mainRouter.use("/materials", materialsRouter);

export { mainRouter };
