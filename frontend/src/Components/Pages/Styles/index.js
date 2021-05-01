import 'bulma/css/bulma.min.css';
import './style.css';
import React from 'react';

export class CustomTitle extends React.Component {
    render() {
      return (
        <div className="home-title">
            <h1 className="title is1">{this.props.text}</h1>
        </div>
      );
    }
}

export class CustomParagraph extends React.Component {
    render() {
      return (
        <div className="home-text">
            <p>{this.props.text}</p>
        </div>
      );
    }
}

