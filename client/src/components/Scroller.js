import React, { Component } from 'react';

export default class Scroller extends Component {

  getSites() {
    console.log(this.props.fData);
      return this.props.fData.map((x, i) => {
        console.log(x)
        return (
          <div className="site" key={i}>
            <h2>{x.website}</h2>
            <a href={x.url}>{x.url}</a>
            <img src={x.img} alt="" />
            <div>
              <p>{x.date}</p>
              <p>Added by {x.addedBy}</p>
            </div>
          </div>
        )
      }).reverse()
    }

  render() {
    return (
      <div className="scroller">
        {this.getSites()}
      </div>
    )
  }
}