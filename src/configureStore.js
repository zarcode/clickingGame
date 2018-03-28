import logger from 'redux-logger';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import users from './reducers/users';
import scores from './reducers/scores';
import currentUser from './reducers/currentUser';

const appReducer = combineReducers({
  scores,
  users,
  currentUser,
});

export const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default () => {
  const middleWares = [];

  if (process.env.NODE_ENV) {
    middleWares.push(logger);
  }

  const store = createStore(persistedReducer, applyMiddleware(...middleWares));
  const persistor = persistStore(store);
  return { store, persistor };
};
