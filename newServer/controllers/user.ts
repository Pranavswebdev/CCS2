// const User = require("../models/user.ts");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

import bcrypt from "bcryptjs";
import jwt, { Secret, VerifyOptions } from "jsonwebtoken";
import User from "../models/user";
import { Request, Response } from "express";
import { CreateUserRequestBody, LoginUserRequestBody } from "../types";

exports.createUser = async (req: Request, res: Response) => {
  const { email, name, password }: CreateUserRequestBody = req.body;

  console.log({ email, name, password });

  try {
    const hashedPassword = await bcrypt.hash(password, 6);
    const userSchema = new User({ email, name, password: hashedPassword });
    await userSchema.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("Connecting Error", error);
  }
};

exports.loginUser = async (req: Request, res: Response) => {
  const { email, password }: LoginUserRequestBody = req.body;
  console.log({ email, password });

  try {
    const user = await User.findOne({ email: email });

    console.log(user);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const jwtSecretKey: Secret = process.env.JWT_SECRET || "";

        let data = {
          user: {name:user.name,email:user.email,_id:user._id},
        };
        let token = jwt.sign(data, jwtSecretKey);

        res.status(200).json({
          message: "Login Success",
          user:  {name:user.name,email:user.email},
          token,
          success: true,
        });
      } else {
        res.status(400).json({
          message: "invalid Credentials",
          success: false,
        });
      }
    } else {
      res.status(400).json({
        message: "User not Found ",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "invalid credentials",
      success: false,
    });
  }
};
