import React from 'react';
import cookie from 'react-cookies';

import $ from 'jquery';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    $.ajax({
      type: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader('Access-Control-Allow-Origin', '*');
        request.setRequestHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        );
        request.setRequestHeader(
          'Access-Control-Allow-Headers',
          'Origin, Content-Type, X-Auth-Token, X-Curr-Account'
        );
        request.setRequestHeader('X-Auth-Token', cookie.load('token'));
        request.setRequestHeader('X-Curr-Account', cookie.load('accountId'));
      },
      url: `http://localhost:3001/api/v1/accounts/${cookie.load('accountId')}/groups`,
      success: (response) => {
        this.setState(response);
      },
      error: (err) => {
        console.log(err);
        alert('Failed to load account info with provided credentials', err);
      }
    });
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
