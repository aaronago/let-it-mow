import React from 'react';
import * as Cookies from 'js-cookie';
import Header from './common/header';
import Home from './home';
import LoginPage from './login-page';
import AddItemForm from './add-item-form';

class App extends React.Component {



  render() {
      return(
        <div>
          <Header />
          <Home />
          <AddItemForm />
        </div>
      );
  }
}
export default App;
