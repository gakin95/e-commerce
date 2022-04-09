const { Kafka } = require("kafkajs");

async function createPartition() {
  const kafka = new Kafka({
    clientId: "player-jersey",
    brokers: ["localhost:9092"],
  });
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: "jersey",
        numPartitions: 2,
      },
    ],
  });
  console.log("two partitions");
  await admin.disconnect();
}

//createPartition();
