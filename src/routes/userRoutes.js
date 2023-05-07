import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.createUser);

export default router;
