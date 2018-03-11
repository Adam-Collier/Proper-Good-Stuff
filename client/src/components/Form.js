import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteTitle: '',
      siteUrl: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {

    this.props.loader();

    console.log(this.state.siteTitle)
    let localS = localStorage.getItem('token');
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    console.log(this.props.fData())
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        website: this.state.siteUrl,
        title: this.state.siteTitle
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'jwt': localS
      })
    }).then(() => {
      console.log('posted');
      this.props.fData();
      setTimeout(() => {
        this.props.loader();
      }, 300);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="title" name= "siteTitle" value={this.state.siteTitle} onChange={this.handleInputChange} />
        <input type="text" placeholder="url" name= "siteUrl" value={this.state.siteUrl} onChange={this.handleInputChange}/>
        <input type="submit" value="Add site" />
      </form>
    )
  }
}