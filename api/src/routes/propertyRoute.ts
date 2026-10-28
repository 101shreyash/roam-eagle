import express from "express";
import ValidateAuthentication from "../middleware/authMiddleware.js";
import { ListProperty, MyProperties } from "../controllers/propertyController.js";


const router = express.Router();


router.post("/property" , ValidateAuthentication , ListProperty)
router.get("/property" , ValidateAuthentication , MyProperties)


export default router;
