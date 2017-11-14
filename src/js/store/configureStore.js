import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from '../reducers';

const logger = createLogger();
const middleware = applyMiddleware(promise(), thunk, logger);

export default createStore(reducer, middleware);
