import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import $ from 'jquery';

import _ from 'lodash';

import './Signup.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      fullName: '',
      email: '',
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
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = _.pick(this.state, [
      'username',
      'password',
      'email',
      'fullName'
    ]);
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
      url: 'http://localhost:3001/api/v1/accounts/0',
      data: 'json=' + escape(JSON.stringify(data)),
      success: (response) => {
        const delay = 375;

        this.timeout = setTimeout(() => {
          window.location.replace('/');
        }, delay);
      },
      error: (err) => {
        alert('Failed to sign up with provided credentials');
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
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
            />
          </FormGroup>
          <FormGroup controlId="fullName" bsSize="large">
            <ControlLabel>Full Name</ControlLabel>
            <FormControl
              value={this.state.fullName}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Sign Up!
          </Button>
        </form>
      </section>
    );
  }
}

export default Signup;
