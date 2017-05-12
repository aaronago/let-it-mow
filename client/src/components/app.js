import React from 'react';
import * as Cookies from 'js-cookie';
import Header from './common/header';
import Home from './home';

class App extends React.Component {



  render() {
      return(
        <div>
          <Home />
        </div>
      );
  }
}
export default App;
