import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React, { useRef } from 'react';
import { Redirect } from "react-router";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
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
      },
    },
  },
}))(MenuItem);

function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState();
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
  // REWORK
  function redirectHanler(param) {
    redirect = {
      state: true, 
      where: param
    };
  };

  const redirectStart = () => {
    if (redirect.state) {
      console.log(redirect.where)
      return <Redirect to={redirect.where} />
    }
  }
  function spawnButton(Icon, TitleText, Navigate) {
    return ( 
      // REWORK
      <button onClick={redirectHanler(Navigate)}>
        <StyledMenuItem >
          <ListItemIcon>
            <Icon fontSize='small' />
          </ListItemIcon>
      
          <ListItemText primary={TitleText} />
        </StyledMenuItem>
      </button>
    );
  }

  return (
    <div>
      <Button aria-controls='customized-menu' aria-haspopup='true' variant='contained' onClick={handleClick} >
        Menu
      </Button>

      <StyledMenu id='customized-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {spawnButton(PeopleAltIcon, 'Users', '/users')}
        {spawnButton(ContactsRoundedIcon, 'Profile')}
        {spawnButton(DashboardRoundedIcon, 'TODO')}
        {spawnButton(ExitToAppRoundedIcon, 'Log out')}

      </StyledMenu>
      {redirectStart}
    </div>
  );
}

export default CustomizedMenus;