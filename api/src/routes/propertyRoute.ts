import express from "express";
import ValidateAuthentication from "../middleware/authMiddleware.js";
import { AddPropertyVisuals, ListProperty, MyProperties, propertyPictures } from "../controllers/propertyController.js";


const router = express.Router();


router.post("/property" , ValidateAuthentication , ListProperty)
router.get("/property" , ValidateAuthentication , MyProperties)
router.post("/propertyvisuals" , ValidateAuthentication , propertyPictures.array("propertyPics" , 4) ,  AddPropertyVisuals)

// work to continue ......


// here we would validate the fact that property visuals (or images submitted by user)
// shoudl not exceed more than 4 .
// another thing we will validate is weather it's actually an image or not (sometimes the user might send mp3 or mp4 or even unusual ones like .avi)
// also we will see what's really there in req.files obj




export default router;
