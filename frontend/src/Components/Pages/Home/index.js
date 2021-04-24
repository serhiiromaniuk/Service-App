import React from "react";
import './style.css';
import data from './data';
import AppPannel from '../../AppPannel';
import { backend, GetUser } from '../../Utils'

function Home() {
  return (
    <div>
      <AppPannel/>

      <div className="home-title">
        <h1 className="title is1">{data.home_title}</h1>
      </div>
      <div className="home-text">
        <p>{data.home_text}</p>
        {
         GetUser(backend.get.user_by_id + '121c3f85-a41b-4930-a994-9109fe85b7ca', 'email')
        }
      </div>
    </div>
  );
}

export default Home;
