import React from 'react';

const Search = (props) => {
  return(
    <div className="search">
      <input type="text" />
      <svg width="100%" height="100%" viewBox="0 0 27 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '1.41421' }}><circle cx="10.136" cy="10.136" r="7.56" style={{ fill: 'none', strokeWidth: '2.97px', stroke: '#000' }} /><path d="M15.884,15.014l7.869,7.87" style={{ fill: 'none', strokeWidth: '2.97px', stroke: '#000' }} /></svg>
    </div>
  )
}

// const buttonStyles = {
//   padding: '3px 20px',
//   background: 'none',
//   borderRadius: '3px',
//   marginLeft: '15px',
//   fontSize: '14px',
//   cursor: 'pointer',
// }

// const Button = (props) => {
//   return (
//     <button style={buttonStyles}>{props.name}</button>
//   )
// }

// const Filter = () => {
//   return(
//     <div>
//       <Button name="newest" />
//       <Button name="oldest" />
//       <Button name="author" />
//     </div>
//   )
// }

export const Utils = () => {
  return(
    <div className="utils">
      <Search />
      {/* <Filter /> */}
    </div>
  )
}