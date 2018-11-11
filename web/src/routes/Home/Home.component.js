import React from 'react';
import cookie from 'react-cookies';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import DelayLinkList from '../../common-components/DelayLink/DelayLinkList.component';

import $ from 'jquery';

import './Home.css';

const api = require('../../api');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { creatingGroup: false, groupName: '' };
  }
  componentDidMount() {
    api.default.execAuth(
      'GET',
      `http://localhost:3001/api/v1/accounts/${cookie.load(
        'accountId'
      )}/groups`,
      null,
      (response) => {
        this.setState({ creatingGroup: this.state.creatingGroup, groupName: this.state.groupName, groups: response});
      },
      (err) => {
        console.log(err);
        alert('Failed to load account groups with provided credentials', err);
      }
    );
    setTimeout(() => {
      const wrapper = $('#wrapper');
      wrapper.removeClass('is-loading');
      const body = $('body');
      body.removeClass('modal-active');
    }, 50);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateForm() {
    return this.state.groupName.length > 0;
  }

  generateGroupsList() {
    const groupsList = [];
    for (let i = 0; i < this.state.length; i++) {
      let link = `/groups/${this.state[i].id}`;
      groupsList.push(
        <DelayLinkList
          class="group"
          to={link}
          delay={375}
          onDelayStart={this._delayStart}
        >
          <p>this.state[i].name</p>
        </DelayLinkList>
      );
    }
    return groupsList;
  }

  createGroupForm(e) {
    e.preventDefault();
    this.setState({
      creatingGroup: true,
      groupName: ''
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state.groupName;
    api.default.execAuth(
      'POST',
      'http://localhost:3001/api/v1/groups',
      'json=' + escape(JSON.stringify(data)),
      (response) => {
        this.setState({ creatingGroup: this.state.creatingGroup, groupName: this.state.groupName, groups: response});
      },
      (err) => {
        alert('Failed to create group with provided credentials', err);
      }
    );
  };

  render() {
    if (this.state.creatingGroup) {
      return (
        <section className="home-page" id="main">
          <div className="create-group" onClick={this.createGroupModal}>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="groupName" bsSize="large">
                <ControlLabel>Group Name</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.groupName}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Create Group
              </Button>
            </form>
          </div>
          <ul>{this.generateGroupsList()}</ul>
        </section>
      );
    } else {
      return (
        <section className="home-page" id="main">
          <li className="create-group group" onClick={this.createGroupForm.bind(this)}>
            + Create new group
          </li>
          <ul>{this.generateGroupsList()}</ul>
        </section>
      );
    }
  }
}

export default Home;
