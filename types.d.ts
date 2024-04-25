declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
      image: string | null;
      username: string;
    };
  }
}
