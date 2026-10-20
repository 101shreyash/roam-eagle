import  express  from "express";
import { ChangePassword } from "../controllers/settingController.js";
import ValidateAuthentication from "../middleware/authMiddleware.js";


const Router = express.Router();

Router.post("/changepassword" , ValidateAuthentication , ChangePassword)


export default Router;
