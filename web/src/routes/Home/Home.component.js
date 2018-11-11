import React from 'react';
import cookie from 'react-cookies';

import DelayLinkList from '../../common-components/DelayLink/DelayLinkList.component';

import $ from 'jquery';

import './Home.css';

const api = require('../../api');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    api.default.execAuth(
      'GET',
      `http://localhost:3001/api/v1/accounts/${cookie.load(
        'accountId'
      )}/groups`,
      null,
      (response) => {
        this.setState(response);
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
    
  }
  

  render() {
    return (
      <section className="home-page" id="main">
        <div className="create-group" onClick={this.createGroupModal}>+ Create new group</div>
        <ul>{this.generateGroupsList()}</ul>
      </section>
    );
  }
}

export default Home;
