import express from 'express';
import logger from 'morgan';
import cors from 'cors';
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
//database, projects, tasks
const servicePorts = [4000, 4001, 4002];

app.post('/events', async (req, res) => {
  const event = req.body;

  console.log(`(${process.pid}) Event Bus (Received Event) ${event.type}`);
  for (const port of servicePorts) {
    try {
      console.log(
        `(${process.pid}) Event Bus (Sending Event to ${port}) ${event.type}`
      );
      let host = '';
        if(port == 4000) {
          host = 'database'
        }
        else if(port == 4001) {
          host = 'projects'
        }
        else {
          host = 'tasks'
        }
      await fetch(`http://${host}:${port}/events`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.log(err);
    }
  }
  res.send({ status: 'OK' });

});

app.listen(4005, '0.0.0.0',() => {
  console.log(`(${process.pid}) Event Bus Listening on 4005`);
});
