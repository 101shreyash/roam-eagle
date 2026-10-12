import express from "express"
import { DeleteAccount, Login, Signup } from "../controllers/authController.js";
import ValidateAuthentication from "../middleware/authMiddleware.js";



const Router = express.Router();


Router.post("/signup" , Signup)
Router.post("/login" ,  Login)
Router.post("/deleteaccount" , ValidateAuthentication ,  DeleteAccount)



export default Router;
