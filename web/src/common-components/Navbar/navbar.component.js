import React, { useImperativeMethods } from 'react';
import { HashRouter } from 'react-router-dom';

import cookie from 'react-cookies';

import DelayLinkList from '../DelayLink/DelayLinkList.component';

import './navbar.css';

class Navbar extends React.Component {
  componentDidMount() {
    let s = document.createElement('script');
    s.src = 'assets/js/dropotronInit.js';
    s.type = 'text/javascript';
    s.async = true;
    document.body.appendChild(s);
  }

  _delayStart = (e, to) => {
    const wrapper = document.getElementById('wrapper');
    wrapper.className = 'is-loading';
  };

  render() {
    if (cookie.load('token')) {
      return (
        <HashRouter>
          <nav id="nav">
            <ul>
              <DelayLinkList to="/" class="logout" delay={375} onDelayStart={this._delayStart}>
                <p>Logout</p>
              </DelayLinkList>
            </ul>
          </nav>
        </HashRouter>
      );
    } else {
      return (
        <HashRouter>
          <nav id="nav">
            <ul>
              <DelayLinkList to="/" delay={375} onDelayStart={this._delayStart}>
                <p>Login</p>
              </DelayLinkList>
              <DelayLinkList
                to="/signup"
                delay={375}
                onDelayStart={this._delayStart}
              >
                <p>Signup</p>
              </DelayLinkList>
            </ul>
          </nav>
        </HashRouter>
      );
    }
  }
}

export default Navbar;
