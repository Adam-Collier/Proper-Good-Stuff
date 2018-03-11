import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const Search = props => {
  console.log(props);
  return (
    <div className="search">
      <input
        type="text"
        onKeyUp={event => props.onTextChange(event.target.value)}
      />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 27 26"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.41421"
        }}
      >
        <circle
          cx="10.136"
          cy="10.136"
          r="7.56"
          style={{ fill: "none", strokeWidth: "2.97px", stroke: "#000" }}
        />
        <path
          d="M15.884,15.014l7.869,7.87"
          style={{ fill: "none", strokeWidth: "2.97px", stroke: "#000" }}
        />
      </svg>
    </div>
  );
};

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "black"
    };
  }

  handleClick(e, isSite) {
    this.setState({
      color: "grey"
    });
    console.log(isSite);
    this.props.switchView(isSite);
    console.log(this.props);
    document.querySelectorAll("h1").forEach(x => {
      x.classList.remove("active");
    });
    e.target.classList.add("active");
  }

  render() {
    return (
      <div className="nav">
        <h1 onClick={e => this.handleClick(e, true)} className="active">
          Your Sites
        </h1>
        <h1 onClick={e => this.handleClick(e, false)}>Account</h1>
      </div>
    );
  }
}

const Utils = props => {
  return (
    <div className="utils">
      <Search onTextChange={props.onTextChange} />
      {props.location.pathname === "/profile" ? (
        <Tabs switchView={props.switchView} />
      ) : null}
    </div>
  );
};

export default withRouter(Utils);
