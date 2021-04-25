import React from "react";
import './style.css';
import data from './data';
import AppPannel from '../../AppPannel';
import { AlertMessage } from '../../Utils/alert';
import 'bulma/css/bulma.min.css';


export default function Home() {
  return (
    <div>
      <AppPannel/>

      <div className="home-title">
        <h1 className="title is1">{data.home_title}</h1>
      </div>
      <div className="home-text">
        <p>{data.home_text}</p>
        
      </div>
    </div>
  );
}


