import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CustomizedMenus from './Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function AppPannel() {
  const classes = useStyles();
  const colors = {
    appBar: {
      background: '#07D6A8',
      border: '1px solid #ffffff'
    },
    title: {
      color: '#00000'
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position='static' style={colors.appBar}>
        <Toolbar variant='dense' >
          <IconButton edge='start' className={classes.menuButton} aria-label='menu'>
            <CustomizedMenus />
          </IconButton>
          <Typography variant='h6'>
            <b>Service App Board</b>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
