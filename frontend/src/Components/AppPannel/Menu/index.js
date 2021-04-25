import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { StyledMenu, StyledMenuItem, linkStyle} from './styles';
import { MakeLogout } from '../../Utils'

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
    MakeLogout()
  };

  return (
    <div >
      <Button aria-controls='customized-menu' aria-haspopup='true' variant='contained' onClick={handleClick} >
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

        <NavLink to='/users' style={linkStyle}>
          <StyledMenuItem onClick={handleClose}>
              <ListItemIcon >
                <PeopleAltIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Users' />
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

        <NavLink to='/about' style={linkStyle}>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon >
              <InfoIcon fontSize='small' />
            </ListItemIcon>
              <ListItemText primary='About' />
          </StyledMenuItem>
        </NavLink>

        <NavLink to='/' style={linkStyle}>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon >
              <DashboardRoundedIcon fontSize='small' />
            </ListItemIcon>
              <ListItemText primary='Todo' />
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
