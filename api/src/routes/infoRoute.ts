import express from "express"
import { checkProfile, getProfileInfo, putProfileInfo, UpdateProfileInfo, upload } from "../controllers/infoController.js";
import ValidateAuthentication from "../middleware/authMiddleware.js";



const Router = express.Router();

// to check weather user infomation is alredy stored or not (helps to skip routes in frontend)
Router.get("/checkprofile" , ValidateAuthentication ,checkProfile );


Router.post("/profileinfo" , ValidateAuthentication , upload.single("profilepic") ,  putProfileInfo);
Router.get("/profileinfo" , ValidateAuthentication ,   getProfileInfo);
Router.patch("/profileinfo" , ValidateAuthentication , upload.single("profilepic") ,  UpdateProfileInfo);



export default Router;
