import React from "react";

export default function({ active }) {
  return active ? (
    <div className="loader">
      <div>
        <h1>taking a screenshot...</h1>
        <svg
          viewBox="0 0 587 383"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlSpace="preserve"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "square",
            strokeMiterlimit: "1.41421"
          }}
        >
          <path
            d="M584.444,16.456c0,-7.887 -6.404,-14.291 -14.291,-14.291l-553.697,0c-7.887,0 -14.291,6.404 -14.291,14.291l0,349.563c0,7.888 6.404,14.291 14.291,14.291l553.697,0c7.887,0 14.291,-6.403 14.291,-14.291l0,-349.563Z"
            style={{ fill: "#fff", strokeWidth: "2.5px", stroke: "#000" }}
          />
          <path
            d="M3.117,39.093l581.327,0"
            style={{ fill: "none", strokeWidth: "2.5px", stroke: "#000" }}
          />
          <circle
            cx="24.686"
            cy="21.365"
            r="7.181"
            style={{ fill: "none", strokeWidth: "2.5px", stroke: "#000" }}
          />
          <circle
            cx="54.413"
            cy="21.365"
            r="7.181"
            style={{ fill: "none", strokeWidth: "2.5px", stroke: "#000" }}
          />
          <circle
            cx="84.14"
            cy="21.365"
            r="7.181"
            style={{ fill: "none", strokeWidth: "2.5px", stroke: "#000" }}
          />
        </svg>
      </div>
    </div>
  ) : null;
}
