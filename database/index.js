import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston'
const app = express();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })()
  ),
  transports: [
    new (winston.transports.Console)(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});
// app.use(logger('dev'));
app.use(cors());
app.use(express.json());
let url = "mongodb+srv://jldu:426final@cluster0.gcgsvv0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function addTask(projectName, task) {
  try {
    await client.connect();
    const db = client.db("426Final");
    const collection = db.collection('Tables');
    const result = await collection.updateOne(
      {name: projectName},
      { $push: {data : task}}
    );
  } finally {
    console.log("success");
    client.close()
  }
}
async function addProject(projectName) {
  try {
    await client.connect();
    const db = client.db("426Final");
    const collection = db.collection('Tables');
    const result = await collection.insertOne({name: projectName, data: []});
  } finally {
    console.log("success");
  }
}

async function removeTask(projectName, task) {
  try {
    await client.connect();
    const db = client.db("426Final");
    const collection = db.collection('Tables');
    const result = await collection.updateOne(
      {name: projectName},
      { $pull: {data:task}}
    );
  } finally {
    console.log("success");
  }
}

async function removeProject(projectName) {
  try {
    await client.connect();
    const db = client.db("426Final");
    const collection = db.collection('Tables');
    const result = await collection.deleteOne({name: projectName})
  } finally {
    console.log("success");
  }
}

async function getAll() {
  try {
    await client.connect();
    const db = client.db("426Final");
    const collection = db.collection('Tables');
    const result = await collection.find({}).toArray();
    return result;
  } finally {
    console.log("success");
  }
}
// async function setComplete(projectName, task) {
//   try {
//     await client.connect();
//     const db = client.db("426Final");
//     const collection = db.collection('Tables');
//     const result = await collection.updateOne(
//       {name: projectName, data:},
//       {}
//     );
//   } finally {
//     console.log("success");
//   }
// }

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'ProjectCreated') {
    const {projectName} = data;
    addProject(projectName);
    res.send(`Added ${projectName} to database`);
    logger.info(`created project ${projectName}`)
  }
  else if (type === 'TaskCreated') {
    const {projectName, task} = data;
    addTask(projectName, task);
    res.send(`Added task to ${projectName}`);
    logger.info(`added ${JSON.stringify(task)} to ${projectName}`)
  }
  else if (type === 'ProjectRemoved') {
    const {projectName} = data;
    removeProject(projectName);
    res.send(`Removed ${projectName} from database`);
    logger.info(`Removed ${projectName} from database`)
  }
  else if (type === 'TaskRemoved') {
    const {projectName, task} = data;
    removeTask(projectName, task);
    res.send(`Removed task from ${projectName}`)
    logger.info(`Removed ${JSON.stringify(task)} from ${projectName}`)
  }
  else {
    res.send("Type corrupted, error occurred");
  }
});

app.get('/data', async (req, res) => {
  const data = await getAll();
  res.json(data);
});

app.listen(4000, '0.0.0.0',() => {
  console.log(`Listening on 4000`);
});
