import { RequestHandler, Request, Response } from "express";
import { prismaClient } from "../client";

export const getAvailableActions : RequestHandler = async (req : Request, res : Response) => {
    const availableActions = await prismaClient.availableAction.findMany();
    res.status(200).json({
        availableActions
    })

}