import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const authMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    res.status(500).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    console.log("Reached");
    const payload = jwt.verify(token as string, JWT_SECRET);
    console.log(payload);
    console.log("Payload is : ", payload);
    // @ts-ignore
    req.id = payload.id;
    next();
  } catch (error) {
    res.status(411).json({
        message : "Some Error Occurred",
        error
    })
  }
};
