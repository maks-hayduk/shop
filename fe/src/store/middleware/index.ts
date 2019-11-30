import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const createMiddleware = (history: History) => {
  const middleware = [
    thunk,
    promiseMiddleware,
    routerMiddleware(history),
  ];

  return middleware;
};

export default createMiddleware;
