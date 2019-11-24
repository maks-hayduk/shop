import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';

import middleware from './middleware';
import { authService, pool } from './services';

const app = express();
const port = 5000;
app.set('json spaces', 2);
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
    if (error) {
      res.status(400).send(error)
    }
    res.status(200).send({
      users: result.rows
    })
  })
})

app.post('/users', authService.signup);
app.post('/users/login', authService.login);

app.get('/get', middleware.checkToken, (req, res) => {
  res.send('ahahaha')
})

app.listen(port, () => {
  console.log(`Back-end started on localhost:${port}`);
})