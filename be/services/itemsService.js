import pool from './dbPoolService';

class ItemsService {
  getAllItems = (req, res) => {
    pool.query('SELECT * FROM items', (error, result) => {
      if (error) {
        res.status(400).send(error);
      }

      res.status(200).send({
        items: result.rows
      })
    })
  }

  _getItemsCount = (query, callback) => {
    pool.query(query, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows[0].count);
      }
    })
  }

  getPaginationItems = (req, res) => {
    const { page, count } = req.query;

    this._getItemsCount('SELECT count(*) FROM items', (err, countOfItems) => {
      pool.query('SELECT * FROM items LIMIT $1 OFFSET $2', [count, (page - 1) * count], (error, result) => {
        if (error) {
          res.status(400).send(error);
        }
  
        const pages = Math.ceil(countOfItems/count);
  
        res.status(200).send({
          meta: {
            page,
            pages,
            perPage: count,
            total: countOfItems
          },
          items: result.rows
        })
      })
    })
  }

  addItem = (req, res) => {
    const { role } = req.decoded;
    const { name, description, price, stock } = req.body;
    if (role !== 'admin') {
      res.status.send('Not allowed')  
    }

    pool.query('INSERT INTO items(name, description, price, stock) VALUES ($1, $2, $3, $4)', [name, description, price, stock], (error, result) => {
      if (error) {
        res.status(400).send(error);
      }

      res.status(201).send({
        message: 'Item was added'
      });
    })
  }

  deleteItem = (req, res) => {
    const { itemid } = req.query;
    const { role } = req.decoded;
    if (role !== 'admin') {
      res.status.send('Not allowed')  
    }

    pool.query('DELETE FROM items WHERE id=$1', [itemid], (error, result) => {
      if (error) {
        res.status(400).send(error);
      }

      res.status(201).send({
        message: 'Item was deleted'
      });
    })
  }

  addItemToOrders = (req, res) => {
    const { id } = req.decoded;
    const { itemId } = req.body;

    pool.query('INSERT INTO orders(user_id, item_id) VALUES ($1, $2)', [id, itemId], (error, result) => {
      if (error) {
        res.status(400).send(error);
      }

      res.status(201).send({
        message: 'Item was added to your order'
      });
    })
  }

  deleteItemFromOrder = (req, res) => {
    const { id } = req.decoded;
    const { itemId } = req.body;

    pool.query('DELETE FROM orders WHERE ctid IN (SELECT ctid FROM orders WHERE user_id=$1 and item_id=$2 LIMIT 1);', [id, itemId], (error, result) => {
      if (error) {
        res.status(400).send(error);
      }

      res.status(201).send({
        message: 'Item was deleted from your order'
      });
    })
  }
}

export default ItemsService;
