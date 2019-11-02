import express from 'express';
import bodyParser from 'body-parser';

import config from './config';

const app = express();
const port = 4200;

app.set('json spaces', 2);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({
    hello: 'world'
  })
})

app.listen(port, () => {
  console.log(`Back-end started on localhost:${port}`);
})