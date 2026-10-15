import { log } from "console";
import { Request, Response } from "express";

async function putProfileInfo(req: Request, res: Response) {
  type commonReligions =| "islam"| "christianity" | "buddhism" | "unaffiliated" | "hinduism" | "other";

const allowedRelgion : string[] = ["islam" , "christianity" , "buddhism" , "unaffiliated" , "hinduism" , "other"]

  const userid = req.user?.userid;
  const profession: string = req.body.profession?.toLowerCase().trim();
  const fullname: string = req.body.fullname?.toLowerCase().trim();
  const country: string = req.body.country?.toLowerCase().trim();
  const city: string = req.body.city?.toLowerCase().trim();
  const religion: commonReligions = req.body.religion?.toLowerCase().trim();
  const profilePicture = req.files;


  if (!fullname || fullname === undefined) {
    return res.status(400).json({
      success: false,
      message: "Fullname is required.",
    });
  }

  if (!country || country === undefined) {
    return res.status(400).json({
      success: false,
      message: "Country name is required.",
    });
  }

  if (!city || fullname === city) {
    return res.status(400).json({
      success: false,
      message: "City name is required.",
    });
  }

  if (!profession || profession === undefined) {
    return res.status(400).json({
      success: false,
      message: "Your Profession is required",
    });
  }

  if (profession.length < 2 || profession.length > 100) {

     return res.status(400).json({
      success : false,
      message : "Don't extend your profession name to more than 100 characters and less than 2."
    })

  }

  if (!religion || religion === undefined) {

   return res.status(400).json({
      success : false,
      message : "Please mention your religion that you follow."
    })
  }

  if (fullname.length < 5 || fullname.length > 100) {

   return res.status(400).json({
      success : false,
      message : "Full name must be between 5 characters to 100 characters."
    })

  }

  if (/^[a-zA-Z ]+$/.test(fullname) === false) {

   return res.status(400).json({
      sucess : false,
      message : "Fullname Cannot contain numbers and symbols."
    })

  }

  if (/^[a-zA-Z ]+$/.test(profession) === false) {

   return res.status(400).json({
      sucess : false,
      message : "Name of the Profession Cannot contain numbers and symbols."
    })

  }

  if (/^[a-zA-Z ]+$/.test(country) === false) {

   return res.status(400).json({
      sucess : false,
      message : "Country name Cannot contain numbers and symbols."
    })
  }

  if (/^[a-zA-Z ]+$/.test(religion) === false) {

   return res.status(400).json({
      sucess : false,
      message : "Religion name Cannot contain numbers and symbols."
    })

  }

  if (allowedRelgion.includes(religion) === false) {

    return res.status(400).json({
      success : false,
      message : `${religion} is not a supported religion. Supported options are : Islam, Christianity, Buddhism, Hinduism, Unaffiliated, Other.`
    })
  }

  if (country.length < 4 || country.length > 100 ) {

   return res.status(400).json({
      success : false,
      message : "Country name should not be more than 100 characters and less than 4"
    })

  }

  if (city.length < 1 || city.length > 100 ) {

  return  res.status(400).json({
      success : false,
      message : "City name should not be more than 100 characters and less than 1"
    })

  }

  console.log("tocheckAndValidate", profilePicture);

}

async function getProfileInfo() {}

export { putProfileInfo, getProfileInfo };
