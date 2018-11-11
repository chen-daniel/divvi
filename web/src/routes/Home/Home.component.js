import React from 'react';
import cookie from 'react-cookies';

import $ from 'jquery';

import './Home.css';

const api = require('../../api');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    api.execAuth(
      'GET',
      `http://localhost:3001/api/v1/accounts/${cookie.load('accountId')}`,
      (response) => {
        this.setState(response);
      },
      (err) => {
        console.log(err);
        alert('Failed to load account info with provided credentials', err);
      }
    );
    setTimeout(() => {
      const wrapper = $('#wrapper');
      wrapper.removeClass('is-loading');
      const body = $('body');
      body.removeClass('modal-active');
    }, 50);
  }

  render() {
    return (
      <section className="home-page" id="main">
        <header>
          <span className="avatar" />
        </header>
        <p>{JSON.stringify(this.state)}</p>
      </section>
    );
  }
}

export default Home;
