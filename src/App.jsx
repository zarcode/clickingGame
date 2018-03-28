import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'normalize.css/normalize.css';

import configureStore from './configureStore';
import './App.css';
import Root from './components/Root';

const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>
);

const renderApp = () => <App />;

export default renderApp;
