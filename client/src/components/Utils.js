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

const DeviceSwitch = props => {
  function handleClick(e) {
    e.preventDefault();
    props.deviceSwitch(props.device);
  }

  return (
    <div>
      <svg
        className="device-switch"
        onClick={handleClick}
        viewBox="0 0 218 98"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="1.414"
      >
        <rect x="206.595" y="25.628" width="6.483" height=".577" />
        <rect x="183.671" y="34.078" width=".577" height="3.479" />
        <rect x="183.671" y="39.31" width=".577" height="3.479" />
        <path
          d="M213.111,26.496l-23.874,0c-2.59,0 -4.698,2.108 -4.698,4.698l0,61.842c0,2.591 2.108,4.699 4.698,4.699l23.874,0c2.591,0 4.699,-2.108 4.699,-4.699l0,-61.842c0,-2.589 -2.109,-4.698 -4.699,-4.698ZM197.933,31.751l6.482,0l0,0.58l-6.482,0l0,-0.58ZM201.14,95.309c-1.601,0 -2.899,-1.298 -2.899,-2.899c0,-1.602 1.298,-2.9 2.899,-2.9c1.601,0 2.899,1.298 2.899,2.9c0,1.601 -1.298,2.899 -2.899,2.899ZM215.778,87.151l-29.208,0l0,-49.593l29.208,0l0,49.593Z"
          fillRule="nonzero"
        />
        <path
          d="M158.665,91.327l0,-5.27l-8.816,0l0,-80.181c0,0 0,-5.876 -6.816,-5.876l-127.389,0c-6.816,0 -6.816,5.876 -6.816,5.876l0,80.181l-8.812,0l0,5.27c0,0 -0.739,6.481 7.942,6.481c0.658,0 141.879,0 142.751,0c8.679,0 7.956,-6.481 7.956,-6.481ZM79.34,3.943c0.727,0 1.315,0.589 1.315,1.316c0,0.727 -0.588,1.318 -1.315,1.318c-0.728,0 -1.318,-0.591 -1.318,-1.318c0,-0.727 0.59,-1.316 1.318,-1.316ZM16.204,9.609l126.271,0l0,76.193l-126.271,0l0,-76.193ZM91.964,93.517l-25.251,0c-4.34,0 -5.139,-2.926 -5.233,-4.648l35.717,0c-0.094,1.722 -0.893,4.648 -5.233,4.648ZM149.614,92.786l-9.709,0c-0.54,0 -0.979,-0.44 -0.979,-0.979c0,-0.542 0.439,-0.979 0.979,-0.979l9.709,0c0.541,0 0.98,0.437 0.98,0.979c0,0.539 -0.439,0.979 -0.98,0.979Z"
          fillRule="nonzero"
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
  console.log(props);
  return (
    <div className="utils">
      <Search onTextChange={props.onTextChange} />
      {props.location.pathname === "/profile" ? (
        <Tabs switchView={props.switchView} />
      ) : (
        <DeviceSwitch device={props.device} deviceSwitch={props.deviceSwitch} />
      )}
    </div>
  );
};

export default withRouter(Utils);
