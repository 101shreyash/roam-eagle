import { Request, Response } from "express";
import multer from "multer";
import pool from "../db.js";

const upload = multer({ dest: "uploads" });
export { upload };

async function putProfileInfo(req: Request, res: Response) {

  type commonReligions =| "islam"| "christianity" | "buddhism"| "unaffiliated"| "hinduism"| "other";

  const allowedRelgion: string[] = [
    "islam",
    "christianity",
    "buddhism",
    "unaffiliated",
    "hinduism",
    "other",
  ];

  const userid = req.user?.userid;
  const profession: string = req.body?.profession?.toLowerCase()?.trim();
  const fullname: string = req.body?.fullname?.toLowerCase()?.trim();
  const country: string = req.body?.country?.toLowerCase()?.trim();
  const city: string = req.body?.city?.toLowerCase()?.trim();
  const religion: commonReligions = req.body?.religion?.toLowerCase().trim();
  const profilePicture = req.file?.filename;

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

  if (!city || city === undefined) {
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

  if (profession?.length < 2 || profession?.length > 100) {
    return res.status(400).json({
      success: false,
      message:
        "Don't extend your profession name to more than 100 characters and less than 2.",
    });
  }

  if (!religion || religion === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please mention your religion that you follow.",
    });
  }



  if (fullname?.length < 5 || fullname?.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Full name must be between 5 characters to 100 characters.",
    });
  }


  if (/^[a-zA-Z ]+$/.test(fullname) === false) {
    return res.status(400).json({
      sucess: false,
      message: "Fullname Cannot contain numbers and symbols.",
    });
  }


  if (/^[a-zA-Z ]+$/.test(profession) === false) {
    return res.status(400).json({
      sucess: false,
      message: "Name of the Profession Cannot contain numbers and symbols.",
    });
  }

  if (/^[a-zA-Z ]+$/.test(country) === false) {
    return res.status(400).json({
      sucess: false,
      message: "Country name Cannot contain numbers and symbols.",
    });
  }

  if (/^[a-zA-Z ]+$/.test(religion) === false) {
    return res.status(400).json({
      sucess: false,
      message: "Religion name Cannot contain numbers and symbols.",
    });
  }

  if (allowedRelgion.includes(religion) === false) {
    return res.status(400).json({
      success: false,
      message: `${religion} is not a supported religion. Supported options are : Islam, Christianity, Buddhism, Hinduism, Unaffiliated, Other.`,
    });
  }

  if (country?.length < 4 || country?.length > 100) {
    return res.status(400).json({
      success: false,
      message:
        "Country name should not be more than 100 characters and less than 4",
    });
  }

  if (city?.length < 1 || city?.length > 100) {
    return res.status(400).json({
      success: false,
      message:
        "City name should not be more than 100 characters and less than 1",
    });
  }

  if (!profilePicture) {
    return res.status(400).json({
      success: false,
      message: "Profile Picture is required.",
    });
  }

  try {
    await pool.query(
      "INSERT INTO user_info (userid , profession , country , city , full_name , religion , profile_picture) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [userid, profession, country, city, fullname, religion, profilePicture],
    );

    return res.status(200).json({
      success: true,
      message: `Welcome to our platform ${fullname} thanks for joining us.`,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

async function checkProfile(req: Request, res: Response) {
  const userid = req.user?.userid;
  const result = await pool.query(
    "SELECT userid FROM user_info WHERE userid = $1",
    [userid],
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: false,
    });
  }

  return res.status(200).json({
    success: true,
    message: true,
  });
}

async function getProfileInfo(req: Request, res: Response) {
  const userid = req.user?.userid;

  const result = await pool.query(
    "SELECT users.role , users.joined_at , user_info.profession , user_info.country , user_info.city , user_info.full_name , user_info.religion , user_info.profile_picture FROM users INNER JOIN user_info ON users.userid = user_info.userid WHERE users.userid = $1;",
    [userid],
  );

  if (result.rowCount === 0) {
    return res.json({
      success: false,
      message:
        "No profile found make sure to add some information about yourself.",
    });
  }

  return res.status(200).json({
    success: true,
    message: result.rows[0],
  });
}


async function UpdateProfileInfo(req : Request , res : Response) {

  type commonReligions =| "islam"| "christianity" | "buddhism"| "unaffiliated"| "hinduism"| "other";

  const allowedRelgion: string[] = [
    "islam",
    "christianity",
    "buddhism",
    "unaffiliated",
    "hinduism",
    "other",
  ];


  const userid = req.user?.userid
  const profession: string = req.body?.profession?.toLowerCase()?.trim();
  const fullname: string = req.body?.fullname?.toLowerCase()?.trim();
  const country: string = req.body?.country?.toLowerCase()?.trim();
  const city: string = req.body?.city?.toLowerCase()?.trim();
  const religion: commonReligions = req.body?.religion?.toLowerCase().trim();
  const profilePicture = req.file?.filename;


  if (profession?.length < 2 || profession?.length > 100) {
    return res.status(400).json({
      success: false,
      message:
        "Don't extend your profession name to more than 100 characters and less than 2.",
    });
  }


  if (fullname?.length < 5 || fullname?.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Full name must be between 5 characters to 100 characters.",
    });
  }


  if (/^[a-zA-Z ]+$/.test(fullname) === false) {
    return res.status(400).json({
      sucess: false,
      message: "Fullname Cannot contain numbers and symbols.",
    });
  }


  if (/^[a-zA-Z ]+$/.test(profession) === false) {
    return res.status(400).json({
      sucess: false,
      message: "Name of the Profession Cannot contain numbers and symbols.",
    });
  }

  if (/^[a-zA-Z ]+$/.test(country) === false) {
    return res.status(400).json({
      sucess: false,
      message: "Country name Cannot contain numbers and symbols.",
    });
  }

  if (/^[a-zA-Z ]+$/.test(religion) === false) {
    return res.status(400).json({
      sucess: false,
      message: "Religion name Cannot contain numbers and symbols.",
    });
  }

  if (allowedRelgion.includes(religion) === false) {
    return res.status(400).json({
      success: false,
      message: `${religion} is not a supported religion. Supported options are : Islam, Christianity, Buddhism, Hinduism, Unaffiliated, Other.`,
    });
  }

  if (country?.length < 4 || country?.length > 100) {
    return res.status(400).json({
      success: false,
      message:
        "Country name should not be more than 100 characters and less than 4",
    });
  }

  if (city?.length < 1 || city?.length > 100) {
    return res.status(400).json({
      success: false,
      message:
        "City name should not be more than 100 characters and less than 1",
    });
  }



console.log('profession' , profession);
console.log('fullname' , fullname);
console.log('country' , country);
console.log('city' , city);
console.log('religion' , religion);
console.log('newpp' , req.file);


// to be continued.




}

export { putProfileInfo, checkProfile, getProfileInfo , UpdateProfileInfo };
