import express from "express";
import { materialsRouter } from "./materials";

const mainRouter = express.Router();

mainRouter.use("/material", materialsRouter);

export { mainRouter };
