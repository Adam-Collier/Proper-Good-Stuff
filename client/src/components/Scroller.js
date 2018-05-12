import React, { Component } from "react";
import Loader from "./Loader";

export default class Scroller extends Component {
  getSites() {
    // console.log(this.props.fData);

    console.log(this.props.deviceSwitch);

    let sitesLength = this.props.fData.length - this.props.loaderInfo.length;

    if (
      this.props.loaderInfo.length == 0 ||
      !this.props.loaderInfo[this.props.loaderInfo.length - 1].desktop
    ) {
      sitesLength = this.props.fData.length;
    }

    return this.props.fData
      .map((x, i) => {
        if (i >= sitesLength) {
          console.log("this is being hit");
          return;
        } else {
          return (
            <div className="site" key={i}>
              <h2>{x.website}</h2>
              <a href={x.url}>{x.url}</a>
              <img src={x[this.props.deviceSwitch]} alt="" />
              <div>
                <p>{x.date}</p>
                <p>Added by {x.addedBy}</p>
              </div>
            </div>
          );
        }
      })
      .reverse();
  }

  render() {
    return (
      <div className="scroller">
        {/* {this.props.loader ? this.createLoader(this.props.loaderInfo) : null} */}
        <Loader
          loader={this.props.loader}
          loaderInfo={this.props.loaderInfo}
          device={this.props.deviceSwitch}
        />
        {this.getSites()}
      </div>
    );
  }
}
