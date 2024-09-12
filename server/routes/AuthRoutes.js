import {Router} from "express";
import {getUserInfo,login, signup,updateProfile,addProfileImage,removeProfileImage,Logout} from "../controllers/AuthController.js";
import { verifyToken } from '../middleware/AuthMiddleware.js';
import multer from "multer";

const upload = multer({dest: 'uploads/profiles/'});

const authRoutes = Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/user-info", verifyToken, getUserInfo); // verifyToken work as middle ware 
authRoutes.post("/update-profile",verifyToken,updateProfile);
authRoutes.post("/add-profile-image" ,verifyToken, upload.single("profile-image"), addProfileImage);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
authRoutes.post("/logout", Logout);
export default authRoutes;