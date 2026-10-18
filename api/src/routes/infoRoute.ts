import express from "express"
import { checkProfile, getProfileInfo, putProfileInfo, upload } from "../controllers/infoController.js";
import ValidateAuthentication from "../middleware/authMiddleware.js";



const Router = express.Router();


Router.get("/checkprofile" , ValidateAuthentication ,checkProfile );
Router.post("/profileinfo" , ValidateAuthentication , upload.single("profilepic") ,  putProfileInfo);
Router.get("/profileinfo" , ValidateAuthentication , getProfileInfo);



export default Router;
