import e, { Request, Response } from "express";
import pool from "../db.js";
import multer from "multer";
import { log } from "node:console";


// ----------- this belongs to Add propertry Visuals Function Down Below -----------------
const propertyPictures = multer({dest : "propertypics"})
export {propertyPictures};
// -----------------------------------------------------------


async function ListProperty(req: Request, res: Response) {

  const userid = req.user?.userid;
  const userRole = req.user?.role
  const propertyStatus: string = req.body.status;
  const title: string = req.body.title?.trim();
  const description: string = req.body.description?.trim();
  const totalrooms: string = req.body.totalrooms;
  const basedOnCountry: string = req.body.country?.trim();
  const city: string = req.body.city?.trim();
  const postalCode: string = req.body.postalcode?.trim();
  const monthlyprice: number = req.body.monthlyprice?.trim();
  const negotiable: string = req.body.negotiable


   if (userRole !== "landlord") {

    return res.status(403).json({
      success : false,
      message : "You as a applicant cannot list your property"
    })
   }


  if (!propertyStatus || propertyStatus === undefined) {
    return res.status(400).json({
      success: false,
      message: "Property Status is required ",
    });
  }

  if (propertyStatus !== "for_rent" && propertyStatus !== "rented") {

    return res.status(400).json({
      success: false,
      message: "Property status should be either for_rent or rented.",
    });
  }


  if (!title || title === undefined) {
    return res.status(400).json({
      success: false,
      message: "Property Title is required ",
    });
  }


  if (title.length > 100) {

    return res.status(400).json({
      success: false,
      message: "Title too long !",
    });
  }

  if (title.length < 10) {

    return res.status(400).json({
      success: false,
      message: "Title too short !",
    });
  }


  if (!description || description === undefined) {
    return res.status(400).json({
      success: false,
      message: "Description is required ",
    });
  }

  if (description.length < 50) {

    return res.status(400).json({
      success: false,
      message: "Description too short.",
    });
  }

  if (description.length > 2000) {

    return res.status(400).json({
      success: false,
      message: "Description too long.",
    });
  }

  if (!totalrooms || totalrooms === undefined) {
    return res.status(400).json({
      success: false,
      message: "Room Count is required ",
    });
  }

  if (/^[1-9][0-9]*$/.test(totalrooms) === false) {

     return res.status(400).json({
      success: false,
      message: `${totalrooms} is not a valid number , Enter a valid number thats greater than 0.`,
    });

  }

  if (!basedOnCountry || basedOnCountry === undefined) {
    return res.status(400).json({
      success: false,
      message: "You must mention which country this property locates at",
    });
  }


  if (/^[a-zA-Z ]+$/.test(basedOnCountry) === false) {
    return res.status(400).json({
      success: false,
      message: "Country name cannot contain numbers and symbols.",
    });
  }

  if (basedOnCountry.length < 4) {
    return res.status(400).json({
      success: false,
      message: "Country name cannot be less 4 characters.",
    });
  }

  if (!city || city === undefined) {
    return res.status(400).json({
      success: false,
      message: "You must mention which city this property locates at",
    });
  }


  if (/^[a-zA-Z0-9 ]+$/.test(city) === false) {
    return res.status(400).json({
      success: false,
      message: "City name cannot contain special characters and symbols.",
    });
  }


  if (!postalCode || postalCode === undefined) {
    return res.status(400).json({
      success: false,
      message: "Country's Postal Code is required.",
    });
  }

  if (postalCode.length < 3 || postalCode.length > 10) {

    return res.status(400).json({
      success: false,
      message: "Enter valid postal code.",
    });
  }


  if (!monthlyprice || monthlyprice === undefined) {
    return res.status(400).json({
      success: false,
      message: "You must mention property's monthly price.",
    });
  }

  if (monthlyprice < 0) {

    return res.status(400).json({
      success: false,
      message: "Enter valid monthly price.",
    });

  }

  if (!negotiable || negotiable === undefined) {
    return res.status(400).json({
      success: false,
      message:
        "You have to mention weather or not your property is negotiable.",
    });
  }

if (negotiable !== "true" && negotiable !== "false") {

  return res.status(400).json({
      success: false,
      message: "Negotiable should be either true or false.",
    });
}



try {

  const result = await pool.query("INSERT INTO property_info (userid , property_status , title , description , total_room , country , city , postal_code , monthly_price , negotiable) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING property_id" , [userid , propertyStatus , title , description , totalrooms , basedOnCountry , city , postalCode , monthlyprice , negotiable] )

  const propertyid = result.rows[0]

  return res.status(200).json({
    success : true,
    propertyid : propertyid, // we're adding this so that frontend could make sense of the property visual
    // and user would be able to add property visual according to the property they've just listed.
    message : `Your property is sucessfully registered with the property number of ${propertyid}`
  })


}

catch (error) {

  console.log(error);
 return res.status(500).json({
    success : false,
    message : "Server Error"
  })

}

}



async function AddPropertyVisuals(req : Request , res : Response) {

const role = req.user?.role
const propertyPictures : any = req.files
const propertyid : number = req.body.propertyid;

if (role === "applicant") {

 return res.status(403).json({
    success : false,
    message : "As a applicant you can't list your properties."
  })

}


if (!propertyid) {

  return res.status(400).json({
    success : false,
    message : "To add pictures of your property you need to have property details first."
  })

}

const totalNumberofImages : number = propertyPictures.length

if (totalNumberofImages < 2) {

  return res.status(400).json({
    success : false,
    messaage : "Add atleast two images of your property."
  })

}

if (totalNumberofImages > 4 ) {

  return res.status(400).json({
    success : false,
    messaage : "Don't add too many propertyImages keep it between 2 to 4."
  })

}

const image1 = propertyPictures[0]?.filename
const image2 = propertyPictures[1]?.filename
const image3 = propertyPictures[2]?.filename
const image4 = propertyPictures[3]?.filename


try {

//IMAGE 1
 await pool.query("INSERT INTO property_visual (property_id , property_image_url) VALUES ($1,$2)" , [propertyid , image1])
// IMAGE 2
 await pool.query("INSERT INTO property_visual (property_id , property_image_url) VALUES ($1,$2)" , [propertyid , image2])


if (image3 !== undefined) {

 await pool.query("INSERT INTO property_visual (property_id , property_image_url) VALUES ($1,$2)" , [propertyid , image3])

}


if (image4 !== undefined) {

  await pool.query("INSERT INTO property_visual (property_id , property_image_url) VALUES ($1,$2)" , [propertyid , image3])

}


return res.status(200).json({
  success : true,
  message : "All of Your Property Images Added Sucessfully."

})


} // try block ends here .


catch (error : any) {

  if (error?.code === "23503") {

    return res.status(404).json({
      success : false,
      message : "Before adding property images you need to have other details of property."
    })

  }

  console.log(error);
  return res.status(500).json({
    success : false,
    message : "Server Error"
  })



}



};


async function MyProperties(req : Request , res : Response) {

const userid = req.user?.userid
const role = req.user?.role

if (role === "applicant") {

  return res.status(403).json({
    success : false,
    message : "You as an applicant cannot list and view your properties."
  })

}

const result = await pool.query("SELECT property_info.property_id , property_info.property_status , property_info.title , property_info.description , property_info.total_room , property_info.country , property_info.city , property_info.postal_code , property_info.monthly_price , property_info.negotiable , property_visual.visual_id , property_visual.property_image_url FROM property_info INNER JOIN property_visual ON property_info.property_id = property_visual.property_id  WHERE property_info.userid = $1;" , [userid])


if (result.rowCount === 0) {

  return res.status(404).json({
    success : false,
    message : "You've not listed any properties till now ."
  })

}


return res.status(200).json({
  success : true,
  message :  result.rows
})


}

export {ListProperty , MyProperties , AddPropertyVisuals};
