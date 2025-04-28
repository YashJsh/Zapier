import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const client = new PrismaClient();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) =>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    // store it in db   
    await client.$transaction(async (tx : any)=>{
        const run = await tx.zapRun.create({
            data : {
                zapId : zapId,
                metadata : body
            }
        })    
        await tx.zapRunOutbox.create({
            data : {
                zapRunId : run.id
            }
        })
    })
    
    // send it over the queue
    res.json({
        msg : "Recieved"
    })
})

app.listen(3000);