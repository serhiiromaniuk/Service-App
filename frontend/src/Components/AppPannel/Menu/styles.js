import React from "react";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const linkStyle = {
    color: 'black', 
    textDecoration: 'none'
};
  
const StyledMenu = withStyles({
    paper: {
        border: '5px solid #ffffff',
        marginLeft: '-10px',
        boxShadow: '0 10px 20px 0 rgba(69, 90, 100, 0.9)'
    },})((props) => (
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
            background: 'linear-gradient(45deg, #70a2ff 30%, #336ec2 90%)',
        '&.MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: 'linear-gradient(45deg, #70a2ff 30%, #336ec2 90%)'
            }
        }
    }
}))(MenuItem);

export {
    linkStyle,
    StyledMenu,
    StyledMenuItem
};
