import express from "express";
const router = express.Router();
import offUserController from "../controllers/offUserController";
import { middleware } from "../middleware/middleware";
router.get("/",offUserController.getAllUsers);
router.post("/login", offUserController.login);
router.get("/profile",middleware,offUserController.getUserData);
router.put("/updateUsers/:id",offUserController.updateUsers);

export default router