import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import pg from 'pg';
import jwt from 'jsonwebtoken';

import config from './config';
import middleware from './middleware';

const app = express();
const port = 5000;
const Pool = pg.Pool;

const pool = new Pool({
  user: config.dbusername,
  host: 'localhost',
  database: config.dbname,
  password: config.dbpassword,
  port: 5433,
})

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

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, email: req.body.email, password: hashedPassword }
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [user.name, user.email, user.password], (error, result) => {
      if (error) {
        res.status(400).send(error)
      }
      res.status(201).send('User was added')
    })
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', (req, res) => {
  pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], async (error, results) => {
    if (error) {
      res.status(400).send(error)
    }
    const user = results.rows[0];

    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        let token = jwt.sign({ name: user.name }, config.secretKey ,{ expiresIn: '24h' });

        res.status(200).send({
          token,
          success: true,
          message: 'Authentication successful!'
        })
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  })
})

app.get('/get', middleware.checkToken, (req, res) => {
  res.send('ahahaha')
})

app.listen(port, () => {
  console.log(`Back-end started on localhost:${port}`);
})