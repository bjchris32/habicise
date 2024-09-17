import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { Types } from 'mongoose';

interface UserBasicInfo {
  _id: Types.ObjectId;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt
  if (!token) { return res.status(404).json({ message: "Invalid token" }); }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "",
    async (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(404).json({ message: "Error verifying token" });
      }

      // Can not check `instanceof JwtPayload` because `JwtPayload` is just an interface
      if (typeof decoded === 'object' && decoded !== null) {
        const user = await User.findById(decoded.userId)
        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      } else {
        return res.status(404).json({ message: "Error token decoded" });
      }
    }
  )
}

