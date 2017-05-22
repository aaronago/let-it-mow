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
import UserListings from './components/user-listings';
import Header from './components/common/header';
import ChatContainer from './components/chat-components/chat-container';
import ChatRoom from './components/chat-components/chat-room';
import './styles/grid.css';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/chat/:conversationId" component={ChatRoom} />
          <Route path="/chat" component={ChatContainer} />
          <Route path="/listings/:id" component={SingleListingPage} />
          <Route path="/mylistings/" component={UserListings} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
