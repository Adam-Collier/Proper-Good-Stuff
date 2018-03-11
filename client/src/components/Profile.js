import React, { Component } from "react";
import Utils from "./Utils";
import { browserHistory } from "react-router";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "black" };
  }

  componentWillMount() {
    this.props.initialSwitch(true);
  }

  deleteThis = (id, el, img, e) => {
    fetch("/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.props.id,
        site: id,
        element: el,
        image: img
      })
    })
      .then(response => {
        return response.text();
      })
      .then(message => {
        console.log(message);
        message === "logout" ? this.props.signout() : this.props.refetchData();
      });
  };

  getUsersSites = () => {
    return this.props.fData
      .filter(a => {
        return a.addedBy === this.props.user;
      })
      .map((x, i) => {
        console.log(x);
        return (
          <div className="site" key={i} data-id={x._id}>
            <h2>{x.website}</h2>
            <a href={x.url}>{x.url}</a>
            <img src={x.img} alt="" />
            <div>
              <p>{x.date}</p>
              <p>Added by {x.addedBy}</p>
              <svg
                onClick={e => this.deleteThis(x._id, "site", x.img, e)}
                fill="red"
                version="1.1"
                viewBox="0 0 100 100"
                x="0px"
                y="0px"
              >
                <g fill="none" stroke="none" strokeWidth="1">
                  <g fill="red">
                    <path d="M71.0008669,29.9583695 L69.1670904,73.9690058 C69.0977095,75.6341487 67.6699843,77 65.9999745,77 L34.0000255,77 C32.3296244,77 30.9021738,75.6313471 30.8329096,73.9690058 L28.9991331,29.9583695 C28.9761412,29.4065635 28.5101754,28.977875 27.9583695,29.0008669 C27.4065635,29.0238588 26.977875,29.4898246 27.0008669,30.0416305 L28.8346434,74.0522668 C28.9485507,76.7860418 31.2576213,79 34.0000255,79 L65.9999745,79 C68.7410014,79 71.0512913,76.789832 71.1653566,74.0522668 L72.9991331,30.0416305 C73.022125,29.4898246 72.5934365,29.0238588 72.0416305,29.0008669 C71.4898246,28.977875 71.0238588,29.4065635 71.0008669,29.9583695 Z" />
                    <path d="M49,36 L49,70 C49,70.5522847 49.4477153,71 50,71 C50.5522847,71 51,70.5522847 51,70 L51,36 C51,35.4477153 50.5522847,35 50,35 C49.4477153,35 49,35.4477153 49,36 Z" />
                    <path d="M38.0004322,36.0293991 L39.0004322,70.0293991 C39.0166689,70.5814451 39.477353,71.0158044 40.0293991,70.9995678 C40.5814451,70.9833311 41.0158044,70.522647 40.9995678,69.9706009 L39.9995678,35.9706009 C39.9833311,35.4185549 39.522647,34.9841956 38.9706009,35.0004322 C38.4185549,35.0166689 37.9841956,35.477353 38.0004322,36.0293991 Z" />
                    <path d="M60.0004322,35.9706009 L59.0004322,69.9706009 C58.9841956,70.522647 59.4185549,70.9833311 59.9706009,70.9995678 C60.522647,71.0158044 60.9833311,70.5814451 60.9995678,70.0293991 L61.9995678,36.0293991 C62.0158044,35.477353 61.5814451,35.0166689 61.0293991,35.0004322 C60.477353,34.9841956 60.0166689,35.4185549 60.0004322,35.9706009 Z" />
                    <path d="M25,26 L75,26 C75.5522847,26 76,25.5522847 76,25 C76,24.4477153 75.5522847,24 75,24 L25,24 C24.4477153,24 24,24.4477153 24,25 C24,25.5522847 24.4477153,26 25,26 Z" />
                    <path d="M40.9284767,25.3713907 L41.9987377,22.6957382 C42.359599,21.7935848 43.5319575,21 44.5,21 L55.5,21 C56.4735372,21 57.6384304,21.7886584 58.0012623,22.6957382 L59.0715233,25.3713907 L60.9284767,24.6286093 L59.8582157,21.9529568 C59.1916549,20.2865549 57.2913405,19 55.5,19 L44.5,19 C42.7142135,19 40.8063965,20.2914262 40.1417843,21.9529568 L39.0715233,24.6286093 L40.9284767,25.3713907 Z" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        );
      })
      .reverse();
  };

  render() {
    return (
      <div className="profile">
        {this.props.switchView === true ? (
          <div>
            <div className="scroller">{this.getUsersSites()}</div>
          </div>
        ) : (
          <div className="account">
            <h3>Delete Account</h3>
            <p>
              You can delete your account, but keep in mind this action is
              irreversible.
            </p>
            <button onClick={e => this.deleteThis("account")}>
              Delete my account
            </button>
          </div>
        )}
      </div>
    );
  }
}
