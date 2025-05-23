import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const client = new PrismaClient();

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const main = async () => {
  while (1) {
    const pendingRows = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });
    await producer.connect();

    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map(r => ({
        value: r.zapRunId,
      })),
    });

    await client.zapRunOutbox.deleteMany({
        where:{
            id : {
                in : pendingRows.map(r => r.id)
            }
        }
    })
  }
};

main();