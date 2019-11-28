import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';

import middleware from './middleware';
import { authService, itemsService, orderService, userService } from './services';

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.set('json spaces', 2);
app.use(bodyParser.json());

app.post('/users', authService.signup);
app.post('/users/login', authService.login);

app.get('/items', itemsService.getAllItems);
app.get('/pag/items', itemsService.getPaginationItems);

app.get('/user', middleware.checkToken, userService.getUserData);

app.post('/order/add', middleware.checkToken, itemsService.addItemToOrders);
app.post('/order/delete', middleware.checkToken, itemsService.deleteItemFromOrder);

app.get('/order', middleware.checkToken, orderService.getUserOrder);

app.listen(port, () => {
  console.log(`Back-end started on localhost:${port}`);
})