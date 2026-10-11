
import { Request , Response } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function Signup(req : Request , res : Response) {

type userRole = "landlord" | "applicant"

const reqemail = req.body.email as string
const email = reqemail.toLowerCase();

const password = req.body.password as string

const reqrole : userRole  = req.body.role
const role = reqrole.toLowerCase();



if (!email) {

  return res.status(400).json({
    success : false,
    message : "email is required",
  })
}

if (!password) {

  return res.status(400).json({
    success : false,
    message : "password is required",
  })
}

if (!role) {

  return res.status(400).json({
    success : false,
    message : "role is required",
  })
}

if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false) {

  return res.status(400).json({
    sucess : false,
    message : "Please enter a valid email address."
  })
}

if (password.length < 8) {

  return res.status(400).json({
    sucess : false,
    message : "Password should be atleast of 8 characters long"
  })

}


if (role === "applicant" === false && role === "landlord" === false) {

 return res.status(400).json({
    sucess : false,
    message : "Enter valid Role. Role must be either landlord or applicant."
  })

}


const hashedPassword = await bcrypt.hash(password , 13)

await pool.query("INSERT INTO users (email,hash_password,role) VALUES ($1,$2,$3)" , [email , hashedPassword , role])

return res.status(200).json({

  sucess : true,
  message : "Signup Sucessfull",

})

}




async function Login(req : Request , res : Response) {

  const email = req.body.email as string
  const plainPassword = req.body.password

  if (!email) {

   return res.status(400).json({
      sucess : false,
      message : "Email is required",
    })
  }

  if (!plainPassword) {

     return res.status(400).json({
      sucess : false,
      message : "Password is required",
    })
  }

 const result =  await pool.query("SELECT userid , email ,hash_password, role FROM users WHERE email = $1" , [email])

interface Userinfo {

  userid : number,
  email : string,
  hash_password : string,
  role : string

}

 const userinfo : Userinfo = result.rows[0]
 console.log(userinfo);



 if (result.rowCount === 0) {

 return res.status(401).json({
    sucess : false,
    message : "Invalid Credentials"
  })

 }


  const matched = await bcrypt.compare(plainPassword , userinfo.hash_password)

  if (!matched) {

    return res.status(401).json({
      sucess : false,
      message : "Invalid Credentials"
    })
  }



  const token = jwt.sign({email : email , userid : userinfo.userid} , process.env.JWTSECKEY as string , {expiresIn : "2h"})
  res.cookie("jwt" , token)
  return res.status(200).json({
    sucess : true,
    message : "logged In Sucessfull"
  })



}


export {Signup , Login};
