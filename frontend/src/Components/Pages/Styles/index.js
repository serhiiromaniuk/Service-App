import 'bulma/css/bulma.min.css';
import './style.css';
import React from 'react';

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
      Theming
    </button>
  );
}

const themeInstance = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
            <p>{this.props.text}</p>
        </div>
      );
    }
}

