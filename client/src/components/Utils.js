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
        onClick={handleClick}
        className="device-switch"
        viewBox="0 0 260 182"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="1.414"
      >
        <clippath id="_clip1">
          <rect x="157.093" y="40.812" width="102.04" height="102.04" />
        </clippath>
        <g clipPath="url(#_clip1)">
          <clippath id="_clip2">
            <rect x="157" y="40" width="103" height="103" />
          </clippath>
          <g clipPath="url(#_clip2)">
            <use
              xlinkHref="#_Image3"
              x="157.093"
              y="40.812"
              width="102.04"
              height="102.04"
            />
          </g>
        </g>
        <clippath id="_clip4">
          <rect width="181.961" height="181.961" />
        </clippath>
        <g clipPath="url(#_clip4)">
          <use xlinkHref="#_Image5" width="182" height="182" />
        </g>
        <defs>
          <image
            id="_Image3"
            width="103"
            height="103"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABnCAYAAAAdQVz5AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD3klEQVR4nO3dTWtcVRjA8V8m5oXUahPSUltCi9CFVlAQBamC1IUrd1UEdwW3fhC3foMq6KqgUuxKQfFlJ4hCURCqCdS3xpi+mNhmXJwZojFjae5kzjOT5w9nMXPhnOfe/z3nOXcuzEOSJEmSJHuesdoBDJBZHMW9PY5fwyJ+H1hEd+Ce2gFsYQzzuB+tPvd9BA9jrsfx3/AZVnG7z2PviCgz5yBexinlIk7pf2xTyqyZ6HF8HVfxIz7Be/i+zzEMHY/jHC7jJjbQrtjWFEHv4PQunnd45vEWVtSXsrWt4k2c3LWzvwPjtQbucBavKJKiLLFdJnFY2SB8odw8A6XfSfduOS2mmC7zeASHagxeU84BLCiJOiotRcxCjcFrbqXvw7Rms2YRn+OnHsdn8RQebDDGjBLrwKkpZ1zz5WwGx5RZuB37sL/hGC2VVphoD6F3ywE8qneybhnic6wV+GEl0c407Kclds5qRK0NwSE8pOScpAe15Ewqs6b2Vj40eXECUyvnXMPPuNX5vIQr+KtSPFtp4QGVnm+61JKzhC9xvfP5I5zHcqV4tjKJM3i1ZhC15PyJP2y+N7mMT5XZFIFp5dfyqtTKOQt4Qu+3kol6cuZwXFk+kh7kbi0wKScwteRcwTfKa+mkBzXlfC3l/C+15NxSttMDf/U7TGTOCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUzKCUyUklktpYZb7bqlXfpRT64xUeScwPNKpd0ITCiVsaoSRc6ZTkv+wajlnG5d6ZEgysxpShtX8a1yw51QCrhWzxtNGIWZs4FzeAanlIq6T+NtQ/53/KMg5wLewCWby9olvI4PK8bVmFGQ8zG+8+9c08ZXhryYxSjIWcaNbb5vK1vz69scGwpqylm2WYqyCceVMmNbmcIRZWPQhBtYbdjHjqgpZwWLWG/Yz0t40n/P5QVlk9D0V4df8EPDPnZE7Z9LjuEx7GvQx6xSOXG/soQdxVm8pjzlN7kBV3ER79uDtX7m8AHWbO60dtJuK8vPSqfd7HzXpM823sXJXTv74IwpM+eCcnGbXsx+tXVlxjyr4uoS4Ql6XFmaXsRziqyDBn9RNvCrUujvonLDLKlYLzuCHEoc08oOa0K9jcqGzXpya/ZgnkmSJEmSJBh/A10iBKZda+npAAAAAElFTkSuQmCC"
          >
            <image
              id="_Image5"
              width="182"
              height="182"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAAC2CAYAAAB08HcEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADVElEQVR4nO3ZvY9lcxjA8e+uJUEoNN7iJVFIJDaiZ4VCFOsfUGpVIkSpkRCF/0GJRrIkCgoNhZBsNCSEeEtQIUKwiqHc2bU5c86dZz6f5Klu5vyeufOdO+feKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjq5jG5x5vHqouqe6ubpqgx04eL9WX1cfVe9W57Zd52CdrL5o75s0R2c+re5sqJPVj23/JJtt5rtWjHutW5Fj1WfVHSudx246294L3IE7vsYh1X0d7aj/rB6uHq3+3niXLd1d3bvGQWuFff9K5+yqb6q3qzPVDxvvsrVTaxxyYo1DqqtXOmdX3Va9UV1RXb/xLltbpYW1wqZOb73AUbLWrQisahdesV+qPth6CRZ1qnpiywV2Iez3q9e3XoJFbf7fZLcijCRsRhI2IwmbkYTNSMJmJGEzkrAZSdiMJGxGEjYjCZuRhM1IwmYkYTOSsBlJ2IwkbEYSNiMJm5GEzUjCZiRhM5KwGUnYjCRsRhI2IwmbkYTNSMJmJGEzkrAZSdiMJGxGEjYjCZuRhM1IwmYkYTOSsBlJ2IwkbEYSNiMJm5GEzUjCZiRhM5KwGUnYjCRsRhI2IwmbkYTNSMJmJGEzkrAZSdiMJGxGEjYjCZuRhM1IwmYkYTOSsBlJ2IwkbEYSNiMJm5GEzUjHFrrOM9U9+zx+srrrPI/9VP220B7shquq687z2Nnqk32+9oPq5cU3ukRvVeeMWWBebwEnlrjIEfFH9dfGO5yoLt94h0NB2Bfvuer5jXd4vnp24x0OBWFfvAfaPuwHNj5/P39WH3fhv2o3Vbcc/DrLONP292ZrzINLPWGX4PQ+e+3CPHWR38eJ9j4wON91Xv1fz8o+hyzhq4Wus+vOVE9Wr1S/rHTmtdXj1QsrnXepHqt+7cKv2Ld2/k9Mqr5cYpmlPu57pHpzoWsdBueqz/+dcwd0xvHqjur2lvs5HQb3V+9tvcR/Lq/eafs/h+Zwz5l28J+GV+bzbHPp81p1RQu5bKkLtfeu+NXq5+r6fwcu5MPqxerp9hpaxEHeu11T3Vjd0IK/iYzwe/V99W17bzgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoV/AKTZUh8oy+1mAAAAAElFTkSuQmCC"
            />
          </image>
        </defs>
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
