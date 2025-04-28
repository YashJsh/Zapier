import { Request, Response, RequestHandler } from "express";
import { ZapCreationSchema } from "../types";
import { prismaClient } from "../client";

export const ZapCreation : RequestHandler = async (req : Request, res : Response) => {
    const id = req.id;
    const body = req.body;
    const parsedData = ZapCreationSchema.safeParse(body);
    if(!parsedData.success){
        res.status(411).json({
            message : "Incorrect Inputs"
        })
    }
    await prismaClient.$transaction(async tx =>{       

           // First creating a zap with the random trigger ID
        const zap = await tx.zap.create({
            data : {
                userId : id,
                triggerId : "",
                actions : {
                    create : parsedData.data?.actions.map((x , index)=> ({
                        actionId : x.availableActionId,
                        sortingOrder : index
                    }))
                }
            }
        })
       
        const trigger = await tx.trigger.create({       // Then creating the trigger
            data : {
                triggerId : parsedData.data?.availableTriggerId as string,
                zapId : zap.id
            }
        })
      
        await tx.zap.update({     // At last updating the zap with the particular trigger id
            where : {
                id : zap.id
            }, 
            data : {
                triggerId : trigger.id
            }
        })
   
        res.status(201).json({
            message : "Zap Created",
            zap : zap.id
        });
        return;
    })
    
}

export const getZaps : RequestHandler = async (req : Request, res : Response) => {
    const id = req.id;
    const zaps = await prismaClient.zap.findMany({
        where : {
            userId : id
        },
        include : {
            actions : {
                include : {
                    type : true
                }
            },
            trigger : {
                include : {
                    type : true
                }
            }
        }
    });
    if(!zaps){
        res.status(411).json({
            message : "Database error"
        })
    }
    res.status(200).json({
        data : zaps
    })
}

export const getSpecificZap : RequestHandler = async (req : Request, res : Response) => {
    const id = req.id;
    const zapId = req.params.zapId;
    const zap = await prismaClient.zap.findFirst({
        where : {
            id : zapId,
            userId : id
        },
        include : {
            actions : {
                include : {
                    type : true
                }
            },
            trigger : {
                include : {
                    type : true
                }
            }
        }
    });
    if(!zap){
        res.status(411).json({
            message : "Database error"
        })
    }
    res.status(200).json({
        data : zap
    })
}