import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function ValidateAuthentication(req: Request,res: Response,next: NextFunction) {

  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      sucess: false,
      message: "Session Expired Please Login Again",
    });
  }


  jwt.verify(token, process.env.JWTSECKEY as string,  (err: any, decoded: any) => {


      if (err) {
        res.status(401).json({
          sucess: false,
          message: "Couldnot verify the token try login again",
        });
      }

      if (decoded) {
        req.user = decoded;
        next();
      }
    },
  );
}

export default ValidateAuthentication;
