const { Kafka } = require("kafkajs");
const aricFullData = require("./response.json");
const createCase = require("./create.json");
const addToCase = require("./addToCase.json");

const sarReport = require("./report");
const data = require("./data.json");
const axios = require("axios");

const postMessages = async (kafkaMessage,caseIdentifier,offset,partition,Status) => {
  return await axios.post("http://localhost:5000/report/api/create",{
    caseIdentifier,
    kafkaMessage:[{...kafkaMessage}],
    offset,
    partition,
    Status
  })
  .then(res => res.data)
  .catch(err => console.log("err",err.response.data))
}

const updateCase = async (kafkaMessage,caseIdentifier,offset,partition,Status) => {
  return await axios.put("http://localhost:5000/report/api/updateCase",{
    caseIdentifier,
    kafkaMessage,
    offset,
    partition,
    Status
  })
  .then(res => res.data)
  .catch(err => console.log("err",err.response.data))
}

const run = async () => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "test-topic",
    messages: [{ value: JSON.stringify(addToCase) }],
  });

  await producer.disconnect();

  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({
      batch,
      resolveOffset,
      heartbeat,
      isRunning,
      isStale,
    }) => {
      //  const report = sarReport(batch,isRunning,isStale,resolveOffset,heartbeat);
      //  console.log("report___________",report)
      //  await postMessages(report);
      let dbStorage = {}
       for (let message of batch.messages){
        if (!isRunning() || isStale()) return
        let messageObj = JSON.parse(message.value.toString());
        console.log("messageObj..........",messageObj)
        if (messageObj?.message?.type === "CREATE_CASE"){
          await postMessages(messageObj,messageObj.message.caseIdentifier,message.offset, batch.partition,"Pending");
        }
        if (messageObj?.message?.type === "ADD_TO_CASE"){
          await updateCase(messageObj,messageObj.message.caseIdentifier,message.offset, batch.partition,"Pending");
        }
        resolveOffset(message.offset);
        await heartbeat()
       }
    },
  });
};

run().catch((e) => console.error(`${e.message}__________________`, e));

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.map((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.map((type) => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});
