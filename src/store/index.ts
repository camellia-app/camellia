import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';

export const store = createStore(rootReducer, compose(applyMiddleware(thunk), applyMiddleware(logger)));
