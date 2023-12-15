import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
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
app.post('/events', async (req, res) => {
  const event = req.body;
  const type = event.type;
  console.log(`Posts Service Received Event: ${type}`);
  res.send({});
});

app.post('/add', async (req, res) => {
  const projectName = req.body.projectName;
  const task = req.body.task;
  try {
    await fetch(`http://eventbus:4005/events`, {
      method: 'POST',
      body: JSON.stringify({type: "TaskCreated", data: {projectName: projectName, task: task}}),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
      console.log(err);
  }
  res.send(`Task added to ${projectName}`);
});

app.post('/delete', async (req, res) => {
  const projectName = req.body.projectName;
  const task = req.body.task
  try {
    await fetch(`http://eventbus:4005/events`, {
      method: 'POST',
      body: JSON.stringify({type: "TaskRemoved", data: {projectName: projectName, task: task}}),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
      console.log(err);
  }
  res.send(`Task removed from ${projectName}`);
});

app.get('/data', async (req, res) => {
  try {
    const response = await fetch(`http://database:4000/data`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured")
  }
});

app.listen(4002, '0.0.0.0',  () => {
  console.log(`Listening on 4002`);
});
