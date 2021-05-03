import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { StyledMenu, StyledMenuItem, linkStyle} from './styles';
import { StyledButton } from '../../Styles'
import { makeLogout, makeReditect, api, opt, rolesMap, handlePermission } from '../../Utils'

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

  const handleCloseLogout = () => {
    setAnchorEl(!anchorEl);
    makeLogout()
  };
  const menuButtonStyles = {
      background: 'linear-gradient(45deg, #70a2ff 30%, #336ec2 90%)',
      border: '1px solid #ffffff',
      marginLeft: '-10px',
      boxShadow: '3px 3px 3px 0 rgba(69, 90, 100, 0.9)',
      width: '100px'
  };

  return (
    <div >
      <Button style={menuButtonStyles} aria-controls='customized-menu' aria-haspopup='true' variant='contained' onClick={handleClick} >
        Menu
      </Button>

      <StyledMenu id='customized-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <NavLink to='/' style={linkStyle}>
          <StyledMenuItem onClick={handleClose}>
              <ListItemIcon >
                <HomeIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Home' />
          </StyledMenuItem>
        </NavLink>

        <NavLink to='/profile' style={linkStyle}>
          <StyledMenuItem onClick={handleClose}>
              <ListItemIcon >
                <ContactsRoundedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Profile' />
          </StyledMenuItem>
        </NavLink>

        <NavLink to='/users' style={linkStyle} onClick={() => { handlePermission('/users', rolesMap.manager) }} >
          <StyledMenuItem onClick={handleClose}>
              <ListItemIcon >
                <PeopleAltIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Users' />
          </StyledMenuItem>
        </NavLink>

        <NavLink to='/organisation' style={linkStyle} onClick={() => { handlePermission('/organisation', rolesMap.admin) }} >
          <StyledMenuItem onClick={handleClose}>
              <ListItemIcon >
                <SupervisedUserCircleIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Organisation' />
          </StyledMenuItem>
        </NavLink>

        <NavLink to='/about' style={linkStyle}>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon >
              <InfoIcon fontSize='small' />
            </ListItemIcon>
              <ListItemText primary='About' />
          </StyledMenuItem>
        </NavLink>

        <NavLink to='/login' style={linkStyle}>
          <StyledMenuItem onClick={handleCloseLogout}>
            <ListItemIcon >
              <ExitToAppRoundedIcon fontSize='small' />
            </ListItemIcon>
              <ListItemText primary='Log out' />
          </StyledMenuItem>
        </NavLink>

      </StyledMenu>
    </div>
  );
}

export default CustomizedMenus;
