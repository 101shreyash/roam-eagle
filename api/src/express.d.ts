interface reqUser {
  userid: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: reqUser;
    }
  }
}

export {};
