import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";

async function ChangePassword(req: Request, res: Response) {
  const userid = req.user?.userid;

  const oldpassword: string = req.body?.oldpassword;
  const newpassword: string = req.body?.newpassword;
  const confirmedpassword: string = req.body?.confirmpassword;

  if (!oldpassword) {
    return res.status(400).json({
      success: false,
      message: "Old Password is required.",
    });
  }

  if (!newpassword) {
    return res.status(400).json({
      success: false,
      message: "New password is required",
    });
  }

  if (!confirmedpassword) {
    return res.status(400).json({
      success: false,
      message: "Confirmation Password is required.",
    });
  }

  if (newpassword?.length < 8) {
    return res.status(400).json({
      success: false,
      message: "New Password should be atleast of 8 characters or longer",
    });
  }

  if (newpassword !== confirmedpassword) {
    return res.status(401).json({
      success: false,
      message: "Confirmation password must match new password.",
    });
  }

  const info: any = await pool.query(
    "SELECT hash_password from users WHERE userid = $1",
    [userid],
  );
  const prevpass = info.rows[0].hash_password as string;
  const matched = await bcrypt.compare(oldpassword, prevpass);

  if (matched === false) {
    return res.status(401).json({
      success: false,
      message: "Previous Password didn't macthed try again",
    });
  }

  const newpass = await bcrypt.hash(newpassword, 13);

  try {
    await pool.query("UPDATE users SET hash_password = $1 WHERE userid = $2", [
      newpass,
      userid,
    ]);
    res.clearCookie("jwt");

    return res.status(200).json({
      success: true,
      message: "Password Changed Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}





export { ChangePassword};
