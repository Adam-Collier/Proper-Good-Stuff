import React from "react";

export const Home = () => {
  let arr = [
    "https://res.cloudinary.com/dxpmsnd8y/image/upload/v1522591908/t4ksf9hrg47q4n9burui.jpg",
    "https://res.cloudinary.com/dxpmsnd8y/image/upload/v1519804784/tupnbhxia5mv3lcm6dim.jpg",
    "https://res.cloudinary.com/dxpmsnd8y/image/upload/v1520429303/nxo4bbvwtzxzhxvytvuf.jpg",
    "https://res.cloudinary.com/dxpmsnd8y/image/upload/v1522591908/t4ksf9hrg47q4n9burui.jpg",
    "https://res.cloudinary.com/dxpmsnd8y/image/upload/v1519804784/tupnbhxia5mv3lcm6dim.jpg",
    "https://res.cloudinary.com/dxpmsnd8y/image/upload/v1520429303/nxo4bbvwtzxzhxvytvuf.jpg"
  ];

  let scrollSites = () => {
    return arr.map((x, i) => {
      console.log(x);
      return (
        <div key={i}>
          <h2>blah blah</h2>
          <a>https://github.com</a>
          <img src={x} alt="" />
          <div>
            <p>blah blah</p>
            <p>Added by Steve</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="home">
      <div>
        <h1>keep a visual reference </h1>
        <h1>of the sites you and your team love</h1>
      </div>
      <div className="scrollSites">{scrollSites()}</div>
    </div>
  );
};
