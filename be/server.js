import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';

import middleware from './middleware';
import { authService, itemsService, orderService } from './services';

const app = express();
const port = 5000;

app.set('json spaces', 2);
app.use(bodyParser.json());

app.post('/users', authService.signup);
app.post('/users/login', authService.login);

app.get('/items', itemsService.getAllItems);
app.get('/pag/items', itemsService.getPaginationItems);

app.post('/order/add', middleware.checkToken, itemsService.addItemToOrders);
app.post('/order/delete', middleware.checkToken, itemsService.deleteItemFromOrder);

app.get('/order', middleware.checkToken, orderService.getUserOrder);

app.listen(port, () => {
  console.log(`Back-end started on localhost:${port}`);
})