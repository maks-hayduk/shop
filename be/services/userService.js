import pool from './dbPoolService';

class UserService {
  getUserData = (req, res) => {
    const { id } = req.decoded;

    pool.query('SELECT * FROM users WHERE id=$1', [id], (error, result) => {
      if (error) {
        res.status(400).send(error)
      }
      const { password, ...userData } = result.rows[0];
      res.status(200).send(userData)
    })
  }
}

export default UserService;
