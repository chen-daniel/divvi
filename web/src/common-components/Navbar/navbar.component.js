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
              <DelayLinkList to="/" delay={375} onDelayStart={this._delayStart}>
                <p>Home</p>
              </DelayLinkList>
              <DelayLinkList
                to="/about"
                delay={375}
                onDelayStart={this._delayStart}
              >
                <p>About</p>
              </DelayLinkList>
              <DelayLinkList
                to="/resume"
                delay={375}
                onDelayStart={this._delayStart}
              >
                <p>Resume</p>
              </DelayLinkList>
              <DelayLinkList
                to="/projects"
                delay={375}
                onDelayStart={this._delayStart}
              >
                <p>Projects</p>
                <ul>
                  <DelayLinkList
                    to="/projects#personal"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>Personal</p>
                    <ul>
                      <DelayLinkList
                        to="/projects#personal_site"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>Personal Site</p>
                      </DelayLinkList>
                      <DelayLinkList
                        to="/projects#home_automation"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>Home Automation</p>
                      </DelayLinkList>
                    </ul>
                  </DelayLinkList>
                  <DelayLinkList
                    to="/projects#hackathon"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>Hackathon</p>
                    <ul>
                      <DelayLinkList
                        to="/projects#lingo"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>linGO</p>
                      </DelayLinkList>
                      <DelayLinkList
                        to="/projects#cappy"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>Cap.py</p>
                      </DelayLinkList>
                      <DelayLinkList
                        to="/projects#argot"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>ARgot</p>
                      </DelayLinkList>
                      <DelayLinkList
                        to="/projects#dangerzone"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>DangerZone</p>
                      </DelayLinkList>
                      <DelayLinkList
                        to="/projects#iceboxme"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>Icebox.me</p>
                      </DelayLinkList>
                    </ul>
                  </DelayLinkList>
                  <DelayLinkList
                    to="/projects#school"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>School</p>
                    <ul>
                      <DelayLinkList
                        to="/projects#mcu_visualization"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>MCU Visualization</p>
                      </DelayLinkList>
                      <DelayLinkList
                        to="/projects#spoiled_tomatillos"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>Spoiled Tomatillos</p>
                      </DelayLinkList>
                      <DelayLinkList
                        to="/projects#web_dev_projects"
                        delay={375}
                        onDelayStart={this._delayStart}
                      >
                        <p>Web Dev Projects</p>
                      </DelayLinkList>
                    </ul>
                  </DelayLinkList>
                </ul>
              </DelayLinkList>
              <DelayLinkList
                to="/photography"
                delay={375}
                onDelayStart={this._delayStart}
              >
                <p>Photography</p>
                <ul>
                  <DelayLinkList
                    to="/photography/portrait"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>Portrait</p>
                  </DelayLinkList>
                  <DelayLinkList
                    to="/photography/street_urban"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>Street/Urban</p>
                  </DelayLinkList>
                  <DelayLinkList
                    to="/photography/landscape"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>Landscape</p>
                  </DelayLinkList>
                  <DelayLinkList
                    to="/photography/event"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>Event</p>
                  </DelayLinkList>
                  <DelayLinkList
                    to="/photography/film"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>Film</p>
                  </DelayLinkList>
                  <DelayLinkList
                    to="/photography/cosplay"
                    delay={375}
                    onDelayStart={this._delayStart}
                  >
                    <p>Cosplay</p>
                  </DelayLinkList>
                </ul>
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
