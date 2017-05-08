import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import * as Cookies from 'js-cookie';
import LoginPage from './components/login-page';
import Home from './components/home'
import './index.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

function checkAuth() {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken){
    browserHistory.replace('/login');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
