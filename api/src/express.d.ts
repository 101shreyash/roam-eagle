interface reqUser {
  userid: number;
  email : string,
}

declare global {
  namespace Express {
    interface Request {
      user?: reqUser;
    }
  }
}

export {};
