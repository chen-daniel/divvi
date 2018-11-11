import React from 'react';

import Router from './routes/Router';
import Navbar from './common-components/Navbar/navbar.component';

import { CookiesProvider } from 'react-cookie';

import './App.css';
class App extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <div id="wrapper">
          <Navbar />
          <div id="content">
            <Router />
          </div>
          <footer id="footer" />
        </div>
      </CookiesProvider>
    );
  }
}

export default App;
