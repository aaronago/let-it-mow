import React from 'react';
import ReactDOM from 'react-dom';
import * as Cookies from 'js-cookie';
import LoginPage from './components/login-page';
import './index.css';
import { Route, IndexRoute, browserHistory, BrowserRouter, Switch } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import App from './components/app';
import SingleListingPage from './components/single-listing-page';
import Map from './components/map-components/map';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

function checkAuth() {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken){
    browserHistory.replace('/login');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/listings/:id" component={SingleListingPage} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
