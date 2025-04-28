import { RequestHandler, Request, Response } from "express";
import { prismaClient } from "../client";

export const getAvailableTriggers : RequestHandler = async (req : Request, res : Response) => {
    const availableTriggers = await prismaClient.availableTriggers.findMany();
    res.status(200).json({
        availableTriggers
    })
    console.log(availableTriggers);
    return;
}