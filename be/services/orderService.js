import pool from './dbPoolService';

class OrderService {
  getUserOrder = (req, res) => {
    const { id } = req.decoded;

    pool.query('SELECT item_id, count(item_id), items.name, items.description, items.price FROM orders INNER JOIN items ON items.id = item_id WHERE user_id=$1 GROUP BY item_id, items.name, items.description, items.price', [id], (error, result) => {
      if (error) {
        res.status(400).send(error);
      }
      res.send(result.rows)
    })
  }
}

export default OrderService;
