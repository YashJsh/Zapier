import { Request, Response, RequestHandler } from "express";
import { changePasswordSchema, signUpSchema } from "../types";
import { prismaClient } from "../client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const SignUp : RequestHandler = async(req : Request, res : Response) => {
    const body = req.body;
    const parsedBody = signUpSchema.safeParse(body);
    if(!parsedBody.success){
        res.status(411).json({
            message : "Incorrect inputs"
        });
        return;
    }
    const userExists = await prismaClient.user.findFirst({
        where : {
            email : parsedBody.data.email
        }
    })

    if(userExists){
        res.status(403).json({
            message : "User Already exists"
        })
        return;
    }

    const hashedPassword = ((await bcrypt.hash(parsedBody.data.password, 8)).toString());

    const user = await prismaClient.user.create({
        data : {
            name : parsedBody.data.name,
            email : parsedBody.data.email,
            password : hashedPassword
        }
    })

    if(!user){
        res.status(500).json({
            message : "Error creation in database"
        });
        return;
    }
    const JWT_SECRET = process.env.JWT_SECRET || "secret123";
    
    const token = jwt.sign({id : user.id} , JWT_SECRET);

    res.status(200).json({
        message : 'User signed Up successfully', 
        data : user,
        token : token
    })
    return;
}

export const SignIn : RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    });

    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({
            message: "Invalid credentials"
        });
        return;
    }

    const JWT_SECRET = process.env.JWT_SECRET || "secret123";
    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
}

export const User : RequestHandler = async (req: Request, res: Response) => {
    const id = req.id;
    if (!id) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    });

    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }

    res.status(200).json({
        user: user
    });
}

export const changePassword : RequestHandler = async (req: Request, res: Response) => {
    const body = req.body;
    const parsedBody = changePasswordSchema.parse(body);
    if(!parsedBody){
        res.status(411).json({
            message : "Incorrect password schema"
        })
        return;
    }
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id: id
        }
    })
    if(!user){
        res.status(411).json({
            message : "User not found"
        })
        return;
    }
    const checkpassword = await bcrypt.compare(body.currentPassword, user.password);
    if(!checkpassword){
        res.status(411).json({
            message : "Current Password is incorrect"
        })
        return;
    }
    const encyptPassowrd = await bcrypt.hash(body.newPassword, 8);
    const updatePasswod = await prismaClient.user.update({
        where : {
            id : id
        }, 
        data : {
            password : encyptPassowrd
        }
    })
    if(!updatePasswod){
        res.status(500).json({
            message : "Unable to update password"
        })
    }
    res.status(200).json({
        message : "Password Updated successfully"
    })
}
