import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Stock from './components/Stock';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Catalog />
      <br />
      <Cart />
      <br />
      <Stock />
    </Provider>
  );
}

export default App;
