import React from 'react';
import * as Cookies from 'js-cookie';
import Home from './home';
import LoginPage from './login-page';

class App extends React.Component {


    render() {
        return(
        <div>
          <Home />
          <LoginPage />
        </div>
    )
    }
}

export default App;
