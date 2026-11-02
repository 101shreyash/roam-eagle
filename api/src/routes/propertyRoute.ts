import express from "express";
import ValidateAuthentication from "../middleware/authMiddleware.js";
import { AddPropertyVisuals, ListProperty, MyProperties, propertyPictures } from "../controllers/propertyController.js";
import { DeleteAllListedProperties } from "../controllers/settingController.js";


const router = express.Router();


router.post("/property" , ValidateAuthentication , ListProperty)
router.get("/property" , ValidateAuthentication , MyProperties)
router.delete("/property" , ValidateAuthentication , DeleteAllListedProperties)




// here im not sure about the architecture choice cause im importing DeleteAllListedProperties from Setting Controller , which voilates the typical backend structure but i think it makes more sense to say that , deleting all the user properties and propertiesVisual is the part of the setting and the reason im not using this router in settingRoute is because i think it looks good to pairup three property route together.


router.post("/propertyvisuals" , ValidateAuthentication , propertyPictures.array("propertyPics" , 4) ,  AddPropertyVisuals)


export default router;
