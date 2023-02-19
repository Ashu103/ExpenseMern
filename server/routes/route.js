import express from "express";
import { create_Categories } from "../controller/controller.js";
const router = express.Router();

router.route("/api/categories").get(create_Categories);

export default router;
