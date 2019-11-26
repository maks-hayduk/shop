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
}

export default ItemsService;
