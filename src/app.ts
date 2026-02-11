import express, { Application } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/health', (_, res) => res.sendStatus(200));

app.get('/', (req, res) => {
  res.send('Nodejs deployment to AWS');
});

export default app;
