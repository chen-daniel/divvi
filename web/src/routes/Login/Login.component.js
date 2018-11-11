import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import cookie from 'react-cookies';

import $ from 'jquery';

import _ from 'lodash';

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const wrapper = $('#wrapper');
      wrapper.removeClass('is-loading');
      const body = $('body');
      body.removeClass('modal-active');
    }, 50);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = _.pick(this.state, ['username', 'password']);
    $.ajax({
      type: 'POST',
      beforeSend: function(request) {
        request.setRequestHeader('Access-Control-Allow-Origin', '*');
        request.setRequestHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        );
        request.setRequestHeader(
          'Access-Control-Allow-Headers',
          'Origin, Content-Type, X-Auth-Token'
        );
      },
      url: 'http://localhost:3001/api/v1/sessions',
      data: 'json=' + escape(JSON.stringify(data)),
      success: (response) => {
        cookie.save('token', response.token);
        console.log(response.accountId);
        cookie.save('accountId', response.accountId);

        window.location.href = '/#/home';
        window.location.reload(false);
      },
      error: (err) => {
        alert('Failed to login with provided credentials', err);
      }
    });
  };

  render() {
    return (
      <section className="login-page" id="main">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </section>
    );
  }
}

export default Login;
