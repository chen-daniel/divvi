import React from 'react';
import axios from 'axios';
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
      receipts: [],
      file: null,
      receiptType: 0
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

  handleType = (event) => {
    this.setState({
      receiptType: event.target.value
    })
  };

  handleFile = (e) => {
    this.setState({
      file: e.target.files[0]
    });
  }

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

  uploadImage = (e) => {
      e.preventDefault();
      const formData = new FormData();
      const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'X-Auth-Token': cookie.load('token'),
            'X-Curr-Account': cookie.load('accountId')
        }
    };
      formData.append('myImage', this.state.file)
      axios.post(`http://localhost:3001/api/v1/uploads`, formData, config)
      .then(res => {
        console.log(res);
        // this.setState({
        // receipts: [...this.state.receipts, res.receipt]
      // })
    }
      );
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
            <form onSubmit={this.uploadImage.bind(this)}>
            <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.handleFile} />

              <FormGroup controlId="groupName" bsSize="large">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.groupName}
                  onChange={this.handleChange}
                />
              </FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormGroup controlId="formControlsSelect" bsSize="large">
                  <select onChange={this.handleType}>
                    <option value="0">I'll charge them</option>
                    <option value="1">They'll pick what they bought</option>
                    <option value="2">Split it equally</option>
                </select>
              </FormGroup>
              <button type="submit">Create</button>
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
