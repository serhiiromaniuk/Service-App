import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import React, { useRef } from 'react';
import { Redirect } from "react-router";
import { useHistory } from 'react-router-dom';
import { NavLink, withRouter } from "react-router-dom";

const linkStyle = {
  color: 'black', 
  textDecoration: 'none'
};

const StyledMenu = withStyles({
  paper: {
    border: '2px solid #00eccd',
    marginLeft: '5px'
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#00eccd',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      }
    }
  }
}))(MenuItem);

function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState();
  const history = useHistory();
  let redirect = {
    state: false,
    where: ''
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  function redirectHanler(param) {
      history.push(param);
  }

  const redirectStart = () => {
    if (redirect.state) {
      console.log(redirect.where)
      return <Redirect to={redirect.where} />
    }
  }
  return (
    <div >
      <Button aria-controls='customized-menu' aria-haspopup='true' variant='contained' onClick={handleClick} >
        Menu
      </Button>

      <StyledMenu id='customized-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon >
            <HomeIcon fontSize='small' />
          </ListItemIcon>
          <NavLink to='/' style={linkStyle}>
            <ListItemText primary='Home' />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon >
            <PeopleAltIcon fontSize='small' />
          </ListItemIcon>
          <NavLink to='/users' style={linkStyle}>
            <ListItemText primary='Users' />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon >
            <ContactsRoundedIcon fontSize='small' />
          </ListItemIcon>
          <NavLink to='/profile' style={linkStyle}>
            <ListItemText primary='Profile' />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon >
            <InfoIcon fontSize='small' />
          </ListItemIcon>
          <NavLink to='/about' style={linkStyle}>
            <ListItemText primary='About' />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon >
            <DashboardRoundedIcon fontSize='small' />
          </ListItemIcon>
          <NavLink to='/' style={linkStyle}>
            <ListItemText primary='Todo' />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon >
            <ExitToAppRoundedIcon fontSize='small' />
          </ListItemIcon>
          <NavLink to='/' style={linkStyle}>
            <ListItemText primary='Log out' />
          </NavLink>
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
}

export default CustomizedMenus;