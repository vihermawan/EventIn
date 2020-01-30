import React, { Component } from 'react';
import '../assets/css/App.css';
//package list
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//component list
import { store, persistor, browserHistory } from './../common/store';
import Router from '../common/router/router';
// import { Lines } from 'react-preloaders';

class App extends Component {
  state = {}
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={browserHistory} />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
