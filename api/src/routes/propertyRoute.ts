import express from "express";
import ValidateAuthentication from "../middleware/authMiddleware.js";
import ListProperty from "../controllers/propertyController.js";


const router = express.Router();


router.post("/property" , ValidateAuthentication , ListProperty)
