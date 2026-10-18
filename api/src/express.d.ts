interface reqUser {
  userid: number;
  email : string,
}




interface ReqFile {


  fieldname : string,
  orginalname : string,
  mimetype : string,
  path : string,
  destination : string,
  filename : string,
  size : number

}


declare global {
  namespace Express {
    interface Request {
      user?: reqUser;
      file : ReqFile,
    }
  }
}

export {};
