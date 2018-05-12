import React from "react";

export default function Loader({ loader, loaderInfo, device }) {
  console.log(loaderInfo);
  console.log(loader);

  return loaderInfo
    .map((x, i) => {
      return (
        <div className="site loader" key={i}>
          <h2>{x.title}</h2>
          <a href={x.url}>
            <span>{x.url}</span>
          </a>
          <span>
            <img
              src={
                x.desktop
                  ? x[device]
                  : "https://res.cloudinary.com/dxpmsnd8y/image/upload/v1525636008/loader.jpg"
              }
              alt=""
            />
          </span>
          <div>
            <p>{new Date().toLocaleDateString()}</p>
            <p>Added by: {x.author}</p>
          </div>
        </div>
      );
    })
    .reverse();

  // document.querySelector(".loader")
  //   ? null
  //   : document
  //       .querySelector(".scroller")
  //       .insertAdjacentHTML("afterbegin", loader);

  // return loader ? (
  //   <div className="site loader">
  //     <h2>{loaderInfo.title}</h2>
  //     <a href={loaderInfo.url}>
  //       <span>{loaderInfo.url}</span>
  //     </a>
  //     <img src="" alt="" />
  //     <div>
  //       <p>{new Date().toLocaleDateString()}</p>
  //       <p>Added by: </p>
  //     </div>
  //   </div>
  // ) : null;
}
