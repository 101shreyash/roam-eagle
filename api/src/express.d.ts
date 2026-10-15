interface reqUser {
  userid: number;
  email : string,
}

declare global {
  namespace Express {
    interface Request {
      user?: reqUser;
      file : any,
      files : any;
    }
  }
}

export {};
