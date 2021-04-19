import React from "react";
import './style.css';
import data from './data';
import VerifyAuth from "../../VerifyAuth";

function Home() {
  return (
    <div>
      <div className="home-title">
        <h1 className="title is1">{data.home_title}</h1>
      </div>
      <div className="home-text">
        <p>{data.home_text}</p>
      </div>
    </div>
  );
}

export default VerifyAuth(Home);
