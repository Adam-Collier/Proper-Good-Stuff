import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.value)
    let localS = localStorage.getItem('token');
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        website: this.state.value,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'jwt': localS
      })
    }).then(() => {
      console.log('posted');
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Add site" />
      </form>
    )
  }
}