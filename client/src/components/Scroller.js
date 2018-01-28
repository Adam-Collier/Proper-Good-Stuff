import React, { Component } from 'react';

export default class Scroller extends Component {
  constructor() {
    super()
    this.state = {
      sites: [],
    }
  }

  componentDidMount() {
    let localS = localStorage.getItem('token');

    fetch('/api', {
      headers: new Headers({
        'jwt': localS
      })
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data);
      if (data.error) { 
        return this.props.signout 
      }
      let sites = data.map(x => {
        console.log(x)
        return (
          <div className="site" key={x.website}>
            <h1>{x.website}</h1>
            <a href={x.url}>{x.url}</a>
            <img src={x.img} alt="" />
            <div>
              <p>{x.date}</p>
              <p>Added by {x.addedBy}</p>
            </div>
          </div>
        )
      })
      this.setState({ sites: sites })
      console.log("state", this.state.sites)
    })
  }

  render() {
    return (
      <div className="scroller">
        {this.state.sites}
      </div>
    )
  }
}