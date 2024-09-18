import { Request, Response } from "express";
import { User } from "../models/user";
import { generateToken, clearToken } from "../utils/auth";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(422).json({ message: "The user already exists" });
  }

  // TODO: rescue error when create the user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id.toString());
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(400).json({ message: "An error occurred in creating the user" });
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id.toString());
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(401).json({ message: "User not found / password incorrect" });
  }
};

const authCheckUser = async (req: Request, res: Response) => {
  return res.
    status(200).
    json({
      message: "User is found",
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      }
    });
};

const logoutUser = (req: Request, res: Response) => {
  clearToken(res);
  return res.status(200).json({ message: "User logged out" });
};

export { registerUser, authenticateUser, authCheckUser, logoutUser };
