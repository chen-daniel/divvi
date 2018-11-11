import React from 'react';
import cookie from 'react-cookies';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import DelayLinkList from '../../common-components/DelayLink/DelayLinkList.component';

import $ from 'jquery';

import './Group.css';

const api = require('../../api');

class Group extends React.Component {
  constructor(props) {
    super(props);
    const matches = window.location.href.match(/(\d+)\D*$/g);
    const group = matches[matches.length - 1];

    this.state = {
      groupId: group,
      uploadingReceipt: false,
      receiptParams: {},
      receipts: []
    };
  }
  componentDidMount() {
    api.default.execAuth(
      'GET',
      `http://localhost:3001/api/v1/groups/${this.state.groupId}/receipts`,
      null,
      (response) => {
        this.setState({
          groupId: this.state.groupId,
          uploadingReceipt: this.state.uploadingReceipt,
          receiptParams: this.state.receiptParams,
          receipts: response
        });
      },
      (err) => {
        console.log(err);
        alert('Failed to load group receipts with provided credentials', err);
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

  generateReceiptsList() {
    const receiptsList = [];
    for (let i = 0; i < this.state.receipts.length; i++) {
      let link = `/receipts/${this.state.groups[i].id}`;
      receiptsList.push(
        <DelayLinkList
          class="receipt"
          to={link}
          delay={375}
          onDelayStart={this._delayStart}
        >
          <p>{this.state.receipts[i].name}</p>
        </DelayLinkList>
      );
    }
    return receiptsList;
  }

  uploadReceiptForm(e) {
    e.preventDefault();
    this.setState({
      uploadingReceipt: true,
      groupName: ''
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state.groupName;
    api.default.execAuth(
      'POST',
      `http://localhost:3001/api/v1/groups/${this.state.groupId}/receipt`,
      'json=' + escape(JSON.stringify(data)),
      (response) => {
        this.setState({
          groupId: this.groupId,
          uploadingReceipt: this.state.uploadingReceipt,
          groupName: this.state.groupName,
          receipts: response
        });
      },
      (err) => {
        alert('Failed to create group with provided credentials', err);
      }
    );
  };

  render() {
    if (this.state.uploadingReceipt) {
      return (
        <section className="Group-page" id="main">
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
          <ul>{this.generateReceiptsList()}</ul>
        </section>
      );
    } else {
      return (
        <section className="group-page" id="main">
          <li
            className="upload-receipt receipt"
            onClick={this.uploadReceiptForm.bind(this)}
          >
            + Upload Receipt to Group
          </li>
          <ul>{this.generateReceiptsList()}</ul>
        </section>
      );
    }
  }
}

export default Group;
