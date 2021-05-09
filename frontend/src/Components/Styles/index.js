import 'bulma/css/bulma.min.css';
import './style.css';
import React from 'react';

import Button from '@material-ui/core/Button';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.background,
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

function DeepChild() {
  const classes = useStyles();

  return (
    <button type="button" className={classes.root}>
      Menu
    </button>
  );
}

const themeInstance = {
  background: 'linear-gradient(45deg, #70a2ff 30%, #336ec2 90%)',
  border: '5px solid #ffffff',
  marginLeft: '-10px',
  boxShadow: '0 10px 20px 0 rgba(69, 90, 100, 0.9)'
};

export function StyledButton() {
  return (
    <ThemeProvider theme={themeInstance}>
      <DeepChild />
    </ThemeProvider>
  );
}

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
            <h3>{this.props.text}</h3>
        </div>
      );
    }
}

