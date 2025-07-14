import { userController } from "../controllers/UserController";
import { Router } from "express";

const controller = new userController();
const router = Router();

router.post("/users", controller.createUser);
router.post("/usersLogin", controller.Login);
router.get("/users", controller.listUser);

export default router;