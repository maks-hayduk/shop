import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';

import pool from './dbPoolService';

class AuthService {
  signup = async (req, res) => {
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
  }

  login = async (req, res) => {
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
  }
}

export default AuthService;
