import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';

import middleware from './middleware';
import { authService, itemsService, orderService, userService } from './services';

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.set('json spaces', 2);
app.use(bodyParser.json());

app.post('/users', authService.signup);
app.post('/users/login', authService.login);

app.get('/items', itemsService.getAllItems);
app.get('/pag/items', itemsService.getPaginationItems);
app.post('/items/add', middleware.checkToken, itemsService.addItem);
app.post('/items/del', middleware.checkToken, itemsService.deleteItem);
app.put('/items/update', middleware.checkToken, itemsService.updateItem);

app.get('/user', middleware.checkToken, userService.getUserData);

app.post('/order/add', middleware.checkToken, itemsService.addItemToOrders);
app.post('/order/delete', middleware.checkToken, itemsService.deleteItemFromOrder);

app.get('/order', middleware.checkToken, orderService.getUserOrder);

app.listen(port, () => {
  console.log(`Back-end started on localhost:${port}`);
})