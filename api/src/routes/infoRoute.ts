import express from "express"
import { getProfileInfo, putProfileInfo } from "../controllers/infoController.js";
import ValidateAuthentication from "../middleware/authMiddleware.js";



const Router = express.Router();


Router.post("/profileinfo" , ValidateAuthentication , putProfileInfo);
Router.get("/profileinfo" , ValidateAuthentication , getProfileInfo);



export default Router;
